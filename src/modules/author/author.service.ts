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

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private AuthorModel: Repository<Author>,
  ) {}

  async create(payload: CreateAuthorInput) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(payload.password, salt);
    const author = new Author();
    author.email = payload.email;
    author.password = password;
    author.username = payload.username;
    return this.AuthorModel.save(author);
  }

  readAll() {
    return this.AuthorModel.find({
      relations: {
        posts: { tags: true },
      },
    });
  }

  read<T>(key: string, value: T) {
    return this.AuthorModel.findOneBy({ [key]: value });
  }

  readById(id: number) {
    return this.AuthorModel.findOne({
      relations: { posts: { tags: true } },
      where: { id },
    });
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
