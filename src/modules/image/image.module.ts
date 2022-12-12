import { Module } from '@nestjs/common';
import { ImageResolver } from './image.resolver';
import { ImageService } from './image.service';

@Module({
  providers: [ImageService, ImageResolver],
  exports: [ImageService],
})
export class ImageModule {}
