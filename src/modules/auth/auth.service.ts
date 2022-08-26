import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Author } from '../author/author.model';
import { AuthorService } from '../author/author.service';
import { LoginInput } from './auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly authorService: AuthorService,
    private readonly jwtService: JwtService,
  ) {}

  private _createToken(payload: Author) {
    const token = this.jwtService.sign({ ...payload });
    return {
      expiresIn: process.env.EXPIRES_IN,
      token,
    };
  }

  validate(payload: Author) {
    return this.authorService.read('id', payload.id);
  }

  async login(payload: LoginInput) {
    const authors = await this.authorService.read('email', payload.email);
    const { ...author } = authors[0];
    if (!authors)
      throw new HttpException(
        'the author with that email was not found',
        HttpStatus.NOT_FOUND,
      );

    const match = await bcrypt.compare(payload.password, author.password);
    if (!match)
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
    return this._createToken(author);
  }
}
