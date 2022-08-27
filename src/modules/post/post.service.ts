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
  constructor(@InjectRepository(Post) private PostModel: Repository<Post>) {}

  async getAll() {
    return await this.PostModel.find();
  }

  async create(payload: CreatePostInput) {
    const post = new Post();
    post.title = payload.title;
    post.content = payload.content;
    post.slug = payload.slug as string;
    post.likes = 0;
    return await this.PostModel.save(post);
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
