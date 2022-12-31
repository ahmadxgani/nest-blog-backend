import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginType {
  @Field()
  expiresIn: string;

  @Field(() => Int)
  id: number;

  @Field()
  token: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  image: string;
}

@ObjectType()
export class MessageType {
  @Field()
  message: string;
}
