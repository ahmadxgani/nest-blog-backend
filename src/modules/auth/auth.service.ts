import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthorService } from '../author/author.service';
import { LoginInput } from './auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly authorService: AuthorService,
    private readonly jwtService: JwtService,
  ) {}

  private _createToken(email: string) {
    return this.jwtService.sign({ email, expiresIn: process.env.EXPIRES_IN });
  }

  validate(payload: string) {
    return this.authorService.read('email', payload);
  }

  async login(payload: LoginInput) {
    const author = await this.authorService.read('email', payload.email);
    if (!author)
      throw new HttpException(
        'the author with that email was not found',
        HttpStatus.NOT_FOUND,
      );

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
    };
  }
}
