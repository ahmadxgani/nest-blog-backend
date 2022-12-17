import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../author/author.entity';
import { Tag } from '../tag/tag.entity';
import { SeedDataCommand } from './seed.command';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Tag])],
  providers: [SeedService, SeedDataCommand],
})
export class SeedModule {}
