import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.model';
import {
  CreatePostInput,
  DeletePostInput,
  UpdatePostInput,
} from './post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private PostModel: Repository<Post>,
  ) {}

  async getAll() {
    return await this.PostModel.find();
  }

  async create(payload: CreatePostInput) {
    return await this.PostModel.insert(payload);
    // return await PostModel.save();
  }

  async read<T>(key: string, value?: T | any) {
    return await this.PostModel.findOneBy({ [key]: value });
  }

  async update(payload: UpdatePostInput) {
    return await this.PostModel.update({ id: payload.id }, payload);
  }

  async delete(payload: DeletePostInput) {
    return await this.PostModel.delete(payload.id);
  }
}
