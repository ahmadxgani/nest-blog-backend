import { Field, ObjectType } from '@nestjs/graphql';

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
