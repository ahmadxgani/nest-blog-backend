import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { Author } from '../author/author.entity';
import { Tag } from './tag.entity';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  draft?: boolean;

  @Field(() => [Int], { nullable: true })
  tags?: Tag[];

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
  @Field()
  slug: string;
}

@InputType()
export class DeletePostInput {
  @Field()
  slug: string;
}

@InputType()
export class UpdatePostInput extends OmitType(CreatePostInput, [
  'author',
] as const) {}
