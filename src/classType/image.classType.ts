import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Image {
  @Field()
  status: number;

  @Field()
  url: string;

  @Field()
  delete: string;
}
