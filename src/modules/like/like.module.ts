import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { Like } from './entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikeResolver, LikeService],
  exports: [LikeService],
})
export class LikeModule {}
