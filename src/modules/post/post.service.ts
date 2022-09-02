import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.model';
import {
  CreatePostInput,
  DeletePostInput,
  UpdatePostInput,
} from './post.input';
import { Post_Tag } from './post_tag.model';
import { Tag } from './tag.model';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private PostModel: Repository<Post>,
    @InjectRepository(Post_Tag) private PostTagModel: Repository<Post_Tag>,
    @InjectRepository(Tag) private TagModel: Repository<Tag>,
  ) {}

  async getAll() {
    return await this.PostModel.find({
      relations: {
        posts: true,
      },
    });
  }

  async create(payload: CreatePostInput) {
    const post = new Post();
    const tag = new Tag();
    const postTag = new Post_Tag();

    post.title = payload.title;
    post.content = payload.content;
    post.slug = payload.slug as string;
    post.likes = 0;
    post.author = payload.author;

    tag.name = 'Programming';

    postTag.post = post;
    postTag.tag = tag;

    const newPost = await this.PostModel.save(post);
    await this.TagModel.save(tag);
    await this.PostTagModel.save(postTag);
    return newPost;
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
