import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Author } from './author.model';
import { Repository } from 'typeorm';
import {
  CreateAuthorInput,
  DeleteAuthorInput,
  UpdateAuthorInput,
} from './author.input';
import { roles } from 'src/interface/role.interface';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private AuthorModel: Repository<Author>,
  ) {}

  async create(payload: CreateAuthorInput) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(payload.password, salt);
    const author = new Author();
    author.username = payload.username;
    author.email = payload.email;
    author.password = password;
    author.posts = [];
    author.role = roles.member;
    return this.AuthorModel.save(author);
  }

  async readAll() {
    return await this.AuthorModel.find();
  }

  read<T>(key: string, value: T | any) {
    return this.AuthorModel.findBy({ [key]: value });
  }

  async update(payload: UpdateAuthorInput) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(payload.password, salt);
    return this.AuthorModel.update(payload.id, { ...payload, password });
  }

  delete({ id }: DeleteAuthorInput) {
    return this.AuthorModel.delete(id);
  }
}
