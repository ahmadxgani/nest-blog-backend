import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ObjectId, Types } from 'mongoose';
import { tags } from 'src/interface/tags.interface';

registerEnumType(tags, { name: 'tags' });

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => [tags], { defaultValue: [tags['no_category']] })
  tags: tags[];

  @Field(() => String)
  authorId: ObjectId;
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
  @Field(() => String)
  _id: Types.ObjectId;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => [tags], { nullable: true })
  tags?: tags[];
}

@InputType()
export class DeletePostInput {
  @Field(() => String)
  _id: ObjectId;
}
