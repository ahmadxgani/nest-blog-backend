import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './post.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { Tag } from '../tag/tag.entity';
import { AuthorModule } from '../author/author.module';
import { LikeModule } from '../like/like.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    LikeModule,
    forwardRef(() => AuthorModule),
    forwardRef(() => TagModule),
  ],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
