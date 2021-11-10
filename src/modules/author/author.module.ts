import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';
import { Author, AuthorSchema } from './author.model';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PostModule),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  providers: [AuthorService, AuthorResolver],
  exports: [AuthorService, MongooseModule],
})
export class AuthorModule {}
