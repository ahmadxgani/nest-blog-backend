import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Repository, In } from 'typeorm';
import { Author } from '../author/author.entity';
import { Post } from './post.entity';
import {
  CreatePostInput,
  DeletePostInput,
  UpdatePostInput,
} from './post.input';
import { Tag } from './tag.entity';
import { CreateTagInput, DeleteTagInput, UpdateTagInput } from './tag.input';

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
    const post = new Post();

    post.title = payload.title;
    post.content = payload.content;
    post.slug = payload.slug as string;
    post.likes = 0;
    post.author = payload.author;
    post.tags = await this.TagModel.find({
      where: { id: In(payload.tags || []) },
    });

    return await this.PostModel.save(post);
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

  async update(payload: UpdatePostInput, author: Author) {
    const post = await this.PostModel.findOneBy({
      id: payload.id,
      author: {
        email: author.email,
      },
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

  async delete(payload: DeletePostInput, author: Author) {
    try {
      return await this.PostModel.delete({
        slug: payload.slug,
        author: { email: author.email },
      });
    } catch (_) {
      throw new ApolloError('Bad Payload', '400');
    }
  }

  async getAllTag() {
    return await this.TagModel.find({
      relations: { posts: { author: true } },
    });
  }

  async createTag(payload: CreateTagInput) {
    const tag = new Tag();

    tag.name = payload.name;

    return await this.TagModel.save(tag);
  }

  async readTag(name: string) {
    return await this.TagModel.findOne({
      where: { name },
      relations: { posts: true },
    });
  }

  async updateTag(payload: UpdateTagInput) {
    const tag = (await this.TagModel.findOneBy({ id: payload.id })) as Tag;
    tag.name = payload.name;
    return await this.TagModel.save(tag);
  }

  async deleteTag(payload: DeleteTagInput) {
    return await this.TagModel.delete({ id: payload.id });
  }
}
