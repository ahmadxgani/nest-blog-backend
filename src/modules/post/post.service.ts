import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Tag } from 'src/modules/tag/tag.entity';
import { Repository, In } from 'typeorm';
import { Author } from '../author/author.entity';
import { LikePost } from './like.entity';
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
    @InjectRepository(LikePost) private LikeModel: Repository<LikePost>,
  ) {}

  async getLikePost(postId: number, authorId: number) {
    return await this.LikeModel.findOne({
      where: {
        post: {
          id: postId,
        },
        author: {
          id: authorId,
        },
      },
    });
  }

  async likePost(postId: number, author: Author) {
    const post = await this.PostModel.findOne({ where: { id: postId } });
    if (!post) throw new ApolloError('Post not found!');

    const isPost = await this.LikeModel.findOne({
      where: {
        post: {
          id: post.id,
        },
        author: {
          id: author.id,
        },
      },
    });

    if (!isPost) {
      await this.LikeModel.save({ post, author, isLiked: false });
    }

    const isAuthorLikedPost = await this.LikeModel.findOne({
      where: {
        isLiked: false,
        author: {
          id: author.id,
        },
      },
      relations: {
        post: true,
      },
    });

    if (!isAuthorLikedPost) {
      const findLikedPost = await this.LikeModel.findOne({
        where: {
          author: {
            id: author.id,
          },
        },
      });
      if (findLikedPost) {
        this.LikeModel.save({ ...findLikedPost, isLiked: false });
        post!.likes = post!.likes - 1;
      }
      return this.PostModel.save(post);
    } else {
      isAuthorLikedPost.isLiked = true;
      this.LikeModel.save(isAuthorLikedPost);

      post!.likes = post!.likes + 1;
      return this.PostModel.save(post);
    }
  }

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
