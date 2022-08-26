import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AuthorModule } from '../author/author.module';
import { Post } from './post.model';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { Post_Tag } from './post_tag.model';
import { Tag } from './tag.model';

@Module({
  imports: [
    forwardRef(() => AuthorModule),
    AuthModule,
    TypeOrmModule.forFeature([Post, Post_Tag, Tag]),
  ],
  providers: [PostService, PostResolver],
})
export class PostModule {}
