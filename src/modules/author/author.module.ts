import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';
import { Author } from './author.model';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PostModule),
    TypeOrmModule.forFeature([Author]),
  ],
  providers: [AuthorService, AuthorResolver],
  exports: [AuthorService],
})
export class AuthorModule {}
