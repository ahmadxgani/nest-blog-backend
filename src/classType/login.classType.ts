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
}
