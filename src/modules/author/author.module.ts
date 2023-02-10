import { Module } from '@nestjs/common';
import { Author } from './author.entity';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '../post/post.module';
import { TagModule } from '../tag/tag.module';
@Module({
  imports: [TypeOrmModule.forFeature([Author]), PostModule, TagModule],
  providers: [AuthorService, AuthorResolver],
  exports: [AuthorService],
})
export class AuthorModule {}
