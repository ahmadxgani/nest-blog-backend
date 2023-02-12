import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Repository } from 'typeorm';

import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private BookmarkModel: Repository<Bookmark>,
  ) {}

  async getBookmarkedPost(authorID: number) {
    return await this.BookmarkModel.findBy({ author: { id: authorID } });
  }

  async bookmarkPost(postId: number, authorID: number) {
    try {
      const isPost = await this.BookmarkModel.findOne({
        where: {
          post: {
            id: postId,
          },
          author: {
            id: authorID,
          },
        },
      });

      if (isPost) {
        await this.BookmarkModel.delete({ id: isPost.id });
      } else {
        await this.BookmarkModel.save({
          post: { id: postId },
          author: { id: authorID },
        });
      }
    } catch {
      throw new ApolloError('Post not found!', HttpStatus.NOT_FOUND.toString());
    }
  }

  // async checkIfPostBookmarked(idPost: number) {
  //   return await this.BookmarkModel.findOne({
  //     where: {
  //       post: {
  //         id: idPost,
  //       },
  //     },
  //   });
  // }
}
