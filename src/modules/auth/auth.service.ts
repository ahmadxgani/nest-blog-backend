import * as bcrypt from 'bcrypt';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApolloError } from 'apollo-server-core';
import {
  generateVerifyCode,
  hashPassword,
  sendToEmail,
} from 'src/util/utilities';
import { CreateAuthorInput } from '../author/author.input';
import { AuthorService } from '../author/author.service';
import {
  LoginInput,
  ResetPasswordInput,
  UpdatePasswordInput,
} from './auth.input';
import type { roles } from 'src/interface/role.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly authorService: AuthorService,
    private readonly jwtService: JwtService,
  ) {}

  private _createToken(id: number, role: roles) {
    return this.jwtService.sign({ id, role });
  }

  async create(payload: CreateAuthorInput) {
    return this.authorService.create(payload);
  }

  async verifyEmail(code: string) {
    const author = await this.authorService.read('verifyCode', code);

    if (!author) throw new ApolloError('The User is not registered.', '404');
    if (author.verified)
      throw new ApolloError(
        'The account has already been activated.',
        HttpStatus.BAD_REQUEST.toString(),
      );

    author.verified = true;
    author.verifyCode = null;
    return this.authorService.update(author);
  }

  async unregisterUser(code: string) {
    const author = await this.authorService.read('verifyCode', code);
    if (!author) throw new ApolloError('Author not registered', '404');
    if (author.verified)
      throw new ApolloError(
        'Cannot unregister, Author has been verified',
        HttpStatus.BAD_REQUEST.toString(),
      );
    this.authorService.delete({ id: author.id });
    return {
      message: 'success unregister user',
    };
  }

  async forgotPassword(email: string) {
    const author = await this.authorService.read('email', email);
    if (!author) throw new ApolloError('User not found', '404');
    if (!!author.resetPasswordToken)
      throw new ApolloError(
        'email has been sent, check your inbox!',
        HttpStatus.BAD_REQUEST.toString(),
      );
    author.resetPasswordToken = generateVerifyCode();

    sendToEmail(author.email, author.resetPasswordToken);
    this.authorService.update(author);
  }

  async resetPassword(payload: ResetPasswordInput) {
    const author = await this.authorService.readById(payload.authorID);
    if (!author)
      throw new ApolloError('Invalid User', HttpStatus.BAD_REQUEST.toString());
    if (!author.resetPasswordToken)
      throw new ApolloError('SUS Request detected');
    if (author.resetPasswordToken !== payload.token)
      throw new ApolloError('Invalid token', HttpStatus.BAD_REQUEST.toString());

    this.authorService.updatePassword({
      id: author.id,
      newPassword: await hashPassword(payload.newPassword),
      resetPasswordToken: null,
    });
  }

  async updatePassword(payload: UpdatePasswordInput & { id: number }) {
    const author = await this.authorService.readById(payload.id);
    if (!author) throw new ApolloError('Invalid User');
    const match = await bcrypt.compare(
      payload.currentPassword,
      author.password,
    );
    if (!match)
      throw new ApolloError(
        'wrong password',
        HttpStatus.UNAUTHORIZED.toString(),
      );

    return this.authorService.updatePassword({
      id: author.id,
      newPassword: payload.newPassword,
    });
  }

  async login(payload: LoginInput) {
    const author = await this.authorService.read('email', payload.email);
    if (!author)
      throw new ApolloError(
        'the author with that email was not found',
        HttpStatus.NOT_FOUND.toString(),
      );
    if (!author.verified)
      throw new ApolloError('Please verify your email.', '403');

    const match = await bcrypt.compare(payload.password, author.password);
    if (!match)
      throw new ApolloError(
        'wrong password',
        HttpStatus.UNAUTHORIZED.toString(),
      );
    const token = this._createToken(author.id, author.role);
    return {
      expiresIn: process.env.EXPIRES_IN,
      id: author.id,
      token,
      username: author.username,
      email: author.email,
      image: author.image,
    };
  }
}
