import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';
import { Author } from './author.entity';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { PassportGuard } from '../../guard/passport.guard';
import { ImageModule } from '../image/image.module';
@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PostModule),
    ImageModule,
    TypeOrmModule.forFeature([Author]),
  ],
  providers: [
    AuthorService,
    AuthorResolver,
    {
      provide: APP_GUARD,
      useClass: PassportGuard,
    },
  ],
  exports: [AuthorService],
})
export class AuthorModule {}
