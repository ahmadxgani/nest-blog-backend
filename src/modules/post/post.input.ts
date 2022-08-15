import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { tags } from 'src/interface/tags.interface';

registerEnumType(tags, { name: 'tags' });

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  slug?: string;

  @Field(() => [tags], { defaultValue: [tags['no_category']] })
  tags: tags[];
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

  @Field(() => [tags])
  tags: tags[];
}

@InputType()
export class DeletePostInput {
  @Field()
  id: number;
}
