import { Field, InputType } from '@nestjs/graphql';
import { Tag } from './tag.model';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => [String])
  tags: Tag[];
}

@InputType()
export class GetPostInput {
  @Field()
  by: string;

  @Field()
  value: string;
}

@InputType()
export class UpdatePostInput {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => [String])
  tags: Tag[];
}

@InputType()
export class DeletePostInput {
  @Field()
  id: number;
}
