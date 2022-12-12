import {
  Args,
  Mutation,
  Query,
  Resolver,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import type { FileUpload } from 'graphql-upload/processRequest.js';
import { Public } from 'src/decorator/public.decorator';
import { ImageService } from './image.service';

@Resolver()
export class ImageResolver {
  constructor(protected imageService: ImageService) {}

  @Query(() => Boolean)
  async image(): Promise<boolean> {
    return true;
  }

  @Mutation(() => Image)
  @Public()
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ): Promise<Image> {
    return await this.imageService.Upload(createReadStream);
  }
}

@ObjectType()
export class Image {
  @Field()
  asset_id: string;

  @Field()
  public_id: string;

  @Field()
  width: number;

  @Field()
  height: number;

  @Field()
  format: string;

  @Field()
  resource_type: string;

  @Field()
  created_at: string;

  @Field()
  bytes: number;

  @Field()
  secure_url: string;
}
