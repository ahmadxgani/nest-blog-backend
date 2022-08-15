import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.model';
import {
  CreatePostInput,
  DeletePostInput,
  UpdatePostInput,
} from './post.input';
import { Author } from '../author/author.model';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private PostModel: Repository<Post>,
    @InjectRepository(Author) private AuthorModel: Repository<Author>,
  ) {}

  getAll() {
    return this.PostModel.find();
  }

  create(payload: CreatePostInput) {
    return this.PostModel.insert(payload);
    // return PostModel.save();
  }

  read<T>(key: string, value?: T | any) {
    return this.PostModel.findOneBy({ [key]: value });
  }

  async update(payload: UpdatePostInput) {
    return await this.PostModel.update({ id: payload.id }, payload);
  }

  async delete(payload: DeletePostInput) {
    return await this.PostModel.delete(payload.id);
  }
}
