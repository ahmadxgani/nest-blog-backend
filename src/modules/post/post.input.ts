import {
  Field,
  InputType,
  Int,
  IntersectionType,
  OmitType,
} from '@nestjs/graphql';
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
  @Field()
  slug: string;
}

@InputType()
export class DeletePostInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class UpdatePostInput extends IntersectionType(
  DeletePostInput,
  OmitType(CreatePostInput, ['author'] as const),
) {}
