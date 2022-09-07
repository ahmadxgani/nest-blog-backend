import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Post } from './post.model';
import {
  CreatePostInput,
  DeletePostInput,
  UpdatePostInput,
} from './post.input';
import { Tag } from './tag.model';
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
    post.tags = await this.TagModel.find({ where: { id: In(payload.tags) } });

    return await this.PostModel.save(post);
  }

  async read<T>(key: string, value?: T | any) {
    return await this.PostModel.findOneBy({ [key]: value });
  }

  async readById(id: number) {
    return await this.PostModel.findOne({
      relations: {
        tags: true,
      },
      where: { id },
    });
  }

  async update(payload: UpdatePostInput) {
    const post = (await this.PostModel.findOneBy({ id: payload.id })) as Post;

    post.title = payload.title;
    post.content = payload.content;
    post.slug = payload.slug as string;
    post.tags = await this.TagModel.find({ where: { id: In(payload.tags) } });

    return await this.PostModel.save(post);
  }

  async delete(payload: DeletePostInput) {
    return await this.PostModel.delete({ id: payload.id });
  }

  async getAllTag() {
    return await this.TagModel.find();
  }

  async createTag(payload: CreateTagInput) {
    const tag = new Tag();

    tag.name = payload.name;

    return await this.TagModel.save(tag);
  }

  async readTag<T>(key: string, value?: T | any) {
    return await this.TagModel.findOneBy({ [key]: value });
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
