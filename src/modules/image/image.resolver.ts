import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import type { FileUpload } from 'graphql-upload/processRequest.js';
import { Image } from 'src/classType/image.classType';
import { Public } from 'src/decorator/public.decorator';
import { ImageService } from './image.service';

@Resolver(() => Image)
export class ImageResolver {
  constructor(protected imageService: ImageService) {}

  @Mutation(() => Image)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ): Promise<Image> {
    try {
      return await this.imageService.Upload(createReadStream);
    } catch (error) {
      throw new ApolloError(error, '400');
    }
  }
}
