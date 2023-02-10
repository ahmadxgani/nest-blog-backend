import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { Tag } from '../tag/tag.entity';
import { LikePost } from './like.entity';
import { BookmarkPost } from './bookmark.entity';
import { Author } from '../author/author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Tag, LikePost, BookmarkPost, Author]),
  ],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
