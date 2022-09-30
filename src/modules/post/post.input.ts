import {
  Field,
  InputType,
  Int,
  IntersectionType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
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
export class UpdatePostInput extends IntersectionType(
  GetPostByIdInput,
  OmitType(CreatePostInput, ['author'] as const),
) {}

@InputType()
export class DeletePostInput extends PickType(GetPostByIdInput, [
  'id',
] as const) {}
