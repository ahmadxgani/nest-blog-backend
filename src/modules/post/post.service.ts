import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Tag } from 'src/modules/tag/tag.entity';
import { Repository, In } from 'typeorm';
import { Author } from '../author/author.entity';
import { BookmarkPost } from './bookmark.entity';
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
    @InjectRepository(Author) private AuthorModel: Repository<Author>,
    @InjectRepository(Tag) private TagModel: Repository<Tag>,
    @InjectRepository(LikePost) private LikeModel: Repository<LikePost>,
    @InjectRepository(BookmarkPost)
    private BookmarkModel: Repository<BookmarkPost>,
  ) {}

  async getPosts(id: number) {
    return await this.PostModel.findBy({ bookmark: { id } });
  }

  async getAuthor(id: number) {
    return await this.AuthorModel.findOneBy({ posts: { id } });
  }

  async getBookmarkedPost(authorID: number) {
    return await this.BookmarkModel.findBy({ author: { id: authorID } });
  }

  async getTag(id: number) {
    return await this.TagModel.findBy({ posts: { id } });
  }

  async getLikePost(postID: number) {
    const result = await this.LikeModel.findBy({
      post: { id: postID },
      isLiked: true,
    });
    return result.map((likePost) => ({ ...likePost, likes: result.length }));
  }

  async getPostByTag(name: string) {
    return await this.PostModel.findBy({ tags: { name } });
  }

  async getPostByAuthor(username: string) {
    return await this.PostModel.findBy({ author: { username } });
  }

  async bookmarkPost(postId: number, authorID: number) {
    const post = await this.PostModel.findOne({ where: { id: postId } });
    if (!post) throw new ApolloError('Post not found!');

    const isPost = await this.BookmarkModel.findOne({
      where: {
        post: {
          id: post.id,
        },
        author: {
          id: authorID,
        },
      },
    });

    if (isPost) {
      await this.BookmarkModel.save({
        isBookmarked: false,
      });
    } else {
      await this.BookmarkModel.save({
        post,
        author: { id: authorID },
      });
    }
  }

  async likePost(postId: number, authorID: number) {
    const post = await this.PostModel.findOneBy({ id: postId });
    if (!post) throw new ApolloError('Post not found!');

    const isPostLiked = await this.LikeModel.findOneBy({
      post: {
        id: post.id,
      },
      author: {
        id: authorID,
      },
    });

    if (isPostLiked) {
      if (!isPostLiked.isLiked) {
        this.LikeModel.save({
          isLiked: false,
          likes: isPostLiked.likes - 1,
        });
        return this.PostModel.save(post);
      }
    } else {
      return await this.LikeModel.save({
        post,
        author: { id: authorID },
      });
    }
  }

  async getAll() {
    return await this.PostModel.find();
  }

  async create(payload: CreatePostInput) {
    const tags = await this.TagModel.find({
      where: { id: In(payload.tags || []) },
    });

    return await this.PostModel.save({
      title: payload.title,
      content: payload.content,
      slug: payload.slug,
      author: { id: payload.authorID },
      tags,
    });
  }

  async checkIfPostBookmarked(idPost: number) {
    return await this.BookmarkModel.findOne({
      where: {
        post: {
          id: idPost,
        },
      },
    });
  }

  async read<T>(key: string, value: T) {
    return await this.PostModel.findOneBy({ [key]: value });
  }

  async readById(id: number) {
    return await this.PostModel.findOneBy({ id });
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
      console.log(_);
      throw new ApolloError('Bad Payload', '400');
    }
  }
}
