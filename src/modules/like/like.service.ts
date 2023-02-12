import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Like } from 'src/modules/like/entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly LikeModel: Repository<Like>,
  ) {}

  async getLikedPost(postID: number) {
    const result = await this.LikeModel.findBy({
      post: { id: postID },
    });
    return result.map((likePost) => ({ ...likePost, likes: result.length }));
  }

  async likePost(postId: number, authorID: number) {
    try {
      const isPostLiked = await this.LikeModel.findOneBy({
        post: {
          id: postId,
        },
        author: {
          id: authorID,
        },
      });

      if (isPostLiked) {
        this.LikeModel.delete({ id: isPostLiked.id });
      } else {
        await this.LikeModel.save({
          post: { id: postId },
          author: { id: authorID },
        });
      }

      const result = await this.LikeModel.findBy({ post: { id: postId } });
      return result.map((likePost) => ({ ...likePost, likes: result.length }));
    } catch {
      throw new ApolloError('Post not found!', HttpStatus.NOT_FOUND.toString());
    }
  }
}
