import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';
import { Post } from '../post/post.model';

@ObjectType({ description: 'Author model' })
@Schema()
export class Author {
  @Field(() => String)
  _id: ObjectId;

  @Field()
  @Prop()
  username: string;

  @Field()
  @Prop()
  email: string;

  @Field(() => [String])
  @Prop()
  bookmark: ObjectId[];

  @Field(() => [String])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Post.name })
  posts: ObjectId[];

  @Field()
  @Prop()
  password: string;

  //   @Field()
  //   follower: string;

  //   @Field()
  //   following: string;
}

export type AuthorDocument = Author & Document;

export const AuthorSchema = SchemaFactory.createForClass(Author);
