import { Field, Int, ObjectType } from '@nestjs/graphql';
import { tags } from 'src/interface/tags.interface';
import { ObjectId, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType({ description: 'Post model' })
@Schema({ timestamps: true })
export class Post {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  authorId: ObjectId;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  content: string;

  @Field(() => [tags], { defaultValue: [tags['no_category']] })
  @Prop()
  tags: tags[];

  @Field(() => Int)
  @Prop()
  likes: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
