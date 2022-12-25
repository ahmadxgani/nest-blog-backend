import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApolloError } from 'apollo-server-core';
import * as bcrypt from 'bcrypt';
import {
  generateVerifyCode,
  hashPassword,
  sendToEmail,
} from 'src/util/utilities';
import { Author } from '../author/author.entity';
import { CreateAuthorInput } from '../author/author.input';
import { AuthorService } from '../author/author.service';
import {
  LoginInput,
  ResetPasswordInput,
  UpdatePasswordInput,
} from './auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly authorService: AuthorService,
    private readonly jwtService: JwtService,
  ) {}

  private _createToken(email: string) {
    return this.jwtService.sign({ email, expiresIn: process.env.EXPIRES_IN });
  }

  async create(payload: CreateAuthorInput) {
    return this.authorService.create(payload);
  }

  async verifyEmail(code: string) {
    const author = await this.authorService.read('verifyCode', code);

    if (!author) throw new ApolloError('The User is not registered.', '404');
    if (author.verified)
      throw new ApolloError('The account has already been activated.', '400');

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
        '400',
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
      throw new ApolloError('email has been sent, check your inbox!', '400');
    author.resetPasswordToken = generateVerifyCode();

    sendToEmail(author.email, author.resetPasswordToken);
    this.authorService.update(author);
  }

  async resetPassword(payload: ResetPasswordInput) {
    const author = await this.authorService.readById(payload.authorID);
    if (!author) throw new ApolloError('Invalid User', '400');
    if (!author.resetPasswordToken)
      throw new ApolloError('SUS Request detected');
    if (author.resetPasswordToken !== payload.token)
      throw new ApolloError('Invalid token', '400');

    this.authorService.updatePassword({
      id: author.id,
      newPassword: await hashPassword(payload.newPassword),
      resetPasswordToken: null,
    });
  }

  validate(payload: string) {
    return this.authorService.read('email', payload);
  }

  async updatePassword(author: Author, payload: UpdatePasswordInput) {
    const match = await bcrypt.compare(
      payload.currentPassword,
      author.password,
    );
    if (!match)
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);

    return this.authorService.updatePassword({
      id: author.id,
      newPassword: payload.newPassword,
    });
  }

  async login(payload: LoginInput) {
    const author = await this.authorService.read('email', payload.email);
    if (!author)
      throw new HttpException(
        'the author with that email was not found',
        HttpStatus.NOT_FOUND,
      );
    if (!author.verified)
      throw new ApolloError('Please verify your email.', '403');

    const match = await bcrypt.compare(payload.password, author.password);
    if (!match)
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
    const token = this._createToken(author.email);
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
