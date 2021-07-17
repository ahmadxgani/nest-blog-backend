import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { roles } from 'src/interface/role.interface';
import { Post } from '../post/post.model';

registerEnumType(roles, { name: 'roles' });

@ObjectType({ description: 'Author model' })
@Schema({ timestamps: true })
export class Author {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field()
  @Prop()
  username: string;

  @Field(() => roles)
  @Prop({ default: roles.member })
  role: roles;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  password: string;

  @Field(() => [Post])
  @Prop({ type: [Types.ObjectId], ref: Post.name, default: [] })
  bookmark: ObjectId[];

  @Field(() => [Post])
  @Prop({ type: [Types.ObjectId], ref: Post.name, default: [] })
  posts: ObjectId[];

  //   @Field()
  //   @Prop()
  //   follower: string;

  //   @Field()
  //   @Prop()
  //   following: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type AuthorDocument = Author & Document;

export const AuthorSchema = SchemaFactory.createForClass(Author);
