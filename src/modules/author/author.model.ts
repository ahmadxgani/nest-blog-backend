import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { roles } from 'src/interface/role.interface';
import { Post } from '../post/post.model';
import * as bcrypt from 'bcrypt';

registerEnumType(roles, { name: 'roles' });

@ObjectType({ description: 'Author model' })
@Schema({ timestamps: true })
export class Author {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field()
  @Prop({ unique: true })
  username: string;

  @Field(() => roles)
  @Prop({ default: roles.member })
  role: roles;

  @Field()
  @Prop({ unique: true })
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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type AuthorDocument = Author & Document;

export const AuthorSchema = SchemaFactory.createForClass(Author);

AuthorSchema.pre<AuthorDocument>('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});
