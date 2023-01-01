import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { Tag } from '../tag/tag.entity';
import { LikePost } from './like.entity';
import { BookmarkPost } from './bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag, LikePost, BookmarkPost])],
  providers: [PostService, PostResolver],
})
export class PostModule {}
