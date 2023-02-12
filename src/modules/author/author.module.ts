import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkModule } from '../bookmark/bookmark.module';
import { PostModule } from '../post/post.module';

import { Author } from './author.entity';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    forwardRef(() => PostModule),
    BookmarkModule,
  ],
  providers: [AuthorService, AuthorResolver],
  exports: [AuthorService],
})
export class AuthorModule {}
