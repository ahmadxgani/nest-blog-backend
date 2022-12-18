import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Image class-type' })
export class Image {
  @Field()
  status: number;

  @Field()
  url: string;

  @Field()
  delete: string;
}
