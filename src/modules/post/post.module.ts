import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorModule } from '../author/author.module';
import { Post, PostSchema } from './post.model';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [
    AuthorModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostService, PostResolver],
})
export class PostModule {}
