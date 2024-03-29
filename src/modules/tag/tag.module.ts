import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Tag } from './tag.entity';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';

@Module({
  providers: [TagResolver, TagService],
  imports: [TypeOrmModule.forFeature([Tag]), AuthModule],
})
export class TagModule {}
