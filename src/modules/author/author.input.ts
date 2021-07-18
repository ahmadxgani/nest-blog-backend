import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ObjectId, Types } from 'mongoose';
import { tags } from 'src/interface/tags.interface';

registerEnumType(tags, { name: 'tags' });

@InputType()
export class CreateAuthorInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class GetAuthorInput {
  @Field(() => String)
  _id: ObjectId;
}

@InputType()
export class UpdateAuthorInput {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => [String])
  posts: Types.ObjectId[];
}

@InputType()
export class DeleteAuthorInput {
  @Field(() => String)
  _id: ObjectId;
}
