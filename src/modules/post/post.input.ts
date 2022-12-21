import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { Author } from '../author/author.entity';
import { Tag } from '../tag/tag.entity';

@InputType()
export class LikePostInput {
  @Field(() => Int)
  idPost: number;
}

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
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
  id: number;
}

@InputType()
export class GetPostBySlugInput {
  @Field()
  slug: string;
}

@InputType()
export class GetLikePost {
  @Field(() => Int)
  id: number;
}

@InputType()
export class DeletePostInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class UpdatePostInput extends PartialType(
  OmitType(CreatePostInput, ['author'] as const),
) {
  @Field(() => Int)
  id: number;
}
