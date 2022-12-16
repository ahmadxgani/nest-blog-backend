import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Tag } from 'src/tag/tag.entity';
import { Repository, In } from 'typeorm';
import { Post } from './post.entity';
import {
  CreatePostInput,
  DeletePostInput,
  UpdatePostInput,
} from './post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private PostModel: Repository<Post>,
    @InjectRepository(Tag) private TagModel: Repository<Tag>,
  ) {}

  async getAll() {
    return await this.PostModel.find({
      relations: {
        tags: true,
        author: true,
      },
    });
  }

  async create(payload: CreatePostInput) {
    const tags = await this.TagModel.find({
      where: { id: In(payload.tags || []) },
    });

    return await this.PostModel.save({
      title: payload.title,
      content: payload.content,
      slug: payload.slug,
      likes: 0,
      author: payload.author,
      tags,
    });
  }

  async read<T>(key: string, value: T) {
    return await this.PostModel.findOne({
      where: {
        [key]: value,
      },
      relations: {
        tags: true,
        author: true,
      },
    });
  }

  async readById(id: number) {
    return await this.PostModel.findOne({
      relations: {
        tags: true,
        author: true,
      },
      where: { id },
    });
  }

  async update(payload: UpdatePostInput) {
    const post = await this.PostModel.findOneBy({
      id: payload.id,
    });

    if (!post) throw new ApolloError('Bad Payload', '400');

    post.title = payload.title || post.title;
    post.content = payload.content || post.content;
    post.slug = payload.slug || post.slug;
    post.tags = await this.TagModel.find({
      where: { id: In(payload.tags || []) },
    });

    return await this.PostModel.save(post);
  }

  async delete(payload: DeletePostInput) {
    try {
      return await this.PostModel.delete({
        id: payload.id,
      });
    } catch (_) {
      throw new ApolloError('Bad Payload', '400');
    }
  }
}
