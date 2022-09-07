import { Field, InputType, Int } from '@nestjs/graphql';
import { Author } from '../author/author.model';
import { Tag } from './tag.model';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  draft?: boolean;

  @Field(() => [Int])
  tags: Tag[];

  author: Author;
}

@InputType()
export class GetPostInput {
  @Field()
  by: string;

  @Field()
  value: string;
}

@InputType()
export class GetPostByIdInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class UpdatePostInput {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => [Int])
  tags: Tag[];
}

@InputType()
export class DeletePostInput {
  @Field(() => Int)
  id: number;
}
