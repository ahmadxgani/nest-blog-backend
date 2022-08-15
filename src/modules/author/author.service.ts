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

  create(payload: CreateAuthorInput) {
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(payload.password, salt);
    return this.AuthorModel.insert({ ...payload, password });
  }

  async readAll() {
    console.log(await this.AuthorModel.find());
    return this.AuthorModel.find();
  }

  read<T>(key: string, value?: T | any) {
    return this.AuthorModel.findOne({ [key]: value });
  }

  update(payload: UpdateAuthorInput) {
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(payload.password, salt);
    return this.AuthorModel.update(payload.id, { ...payload, password });
  }

  delete({ id }: DeleteAuthorInput) {
    return this.AuthorModel.delete(id);
  }
}
