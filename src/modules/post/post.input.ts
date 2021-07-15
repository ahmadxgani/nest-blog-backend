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

  @Field(() => [tags], { defaultValue: [tags['nocategory']] })
  tags: tags[];

  @Field(() => String)
  authorId: ObjectId;
}

@InputType()
export class UpdatePostInput {
  @Field()
  _id: Types.ObjectId;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => [tags], { defaultValue: [tags['no-category']] })
  tags: tags[];
}

@InputType()
export class DeletePostInput {
  @Field()
  _id: Types.ObjectId;
}
