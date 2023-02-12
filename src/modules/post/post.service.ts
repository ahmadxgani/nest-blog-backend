import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Slugify } from 'src/util/utilities';
import { Repository, In } from 'typeorm';
import { TagService } from '../tag/tag.service';
import { Post } from './post.entity';
import {
  CreatePostInput,
  GetPostByIdInput,
  UpdatePostInput,
} from './post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly PostModel: Repository<Post>,
    @Inject(TagService) private readonly tagService: TagService,
  ) {}

  async getPosts(id: number) {
    return await this.PostModel.findBy({ bookmark: { id } });
  }

  async getPostByTag(name: string) {
    return await this.PostModel.findBy({ tags: { name } });
  }

  async getPostByAuthor(username: string) {
    return await this.PostModel.findBy({ author: { username } });
  }

  async getAll() {
    return await this.PostModel.find();
  }

  async create(payload: CreatePostInput) {
    const tags = payload.tags
      ? await this.tagService.getExistedTag(payload.tags)
      : undefined;

    return await this.PostModel.save({
      title: payload.title,
      content: payload.content,
      slug: payload.slug,
      author: { id: payload.authorID },
      tags,
    });
  }

  async read<T>(key: string, value: T) {
    return await this.PostModel.findOneBy({ [key]: value });
  }

  async readById(id: number) {
    return await this.PostModel.findOneBy({ id });
  }

  async update(payload: UpdatePostInput) {
    const tags = payload.tags
      ? await this.tagService.getExistedTag(payload.tags)
      : undefined;

    try {
      return await this.PostModel.save({
        id: payload.id,
        title: payload.title,
        content: payload.content,
        slug: payload.slug || Slugify(payload.title),
        tags,
      });
    } catch (error) {
      console.log(error);
      throw new ApolloError('Bad Payload', HttpStatus.BAD_REQUEST.toString());
    }
  }

  async delete(payload: GetPostByIdInput) {
    try {
      return await this.PostModel.delete({
        id: payload.id,
      });
    } catch (_) {
      console.log(_);
      throw new ApolloError('Bad Payload', HttpStatus.BAD_REQUEST.toString());
    }
  }
}
