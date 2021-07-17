import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthorDocument } from '../author/author.model';
import { AuthorService } from '../author/author.service';
import { LoginInput } from './auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly authorService: AuthorService,
    private readonly jwtService: JwtService,
  ) {}

  private _createToken(payload: AuthorDocument) {
    const token = this.jwtService.sign(payload.toJSON());
    return {
      expiresIn: process.env.EXPIRES_IN,
      token,
    };
  }

  validate(payload: AuthorDocument) {
    return this.authorService.read('_id', payload._id);
  }

  async login(payload: LoginInput) {
    const author = await this.authorService.read('email', payload.email);
    if (!author)
      throw new HttpException(
        'the author with that email was not found',
        HttpStatus.NOT_FOUND,
      );
    return this._createToken(author as unknown as AuthorDocument);
  }
}
