import {
  Field,
  InputType,
  OmitType,
  PartialType,
  IntersectionType,
  Int,
} from '@nestjs/graphql';

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

  @Field(() => [String], { nullable: true })
  tags?: string[];

  authorID: number;
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
export class GetPostBySlugInput {
  @Field()
  slug: string;
}

@InputType()
export class UpdatePostInput extends IntersectionType(
  PartialType(OmitType(CreatePostInput, ['authorID'] as const)),
  GetPostByIdInput,
) {}
