import { Module } from '@nestjs/common';
import { Author } from './author.entity';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from '../image/image.module';
@Module({
  imports: [
    ImageModule,
    TypeOrmModule.forFeature([Author]),
  ],
  providers: [
    AuthorService,
    AuthorResolver,
  ],
  exports: [AuthorService],
})
export class AuthorModule {}
