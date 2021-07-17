import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginType {
  @Field()
  expiresIn: string;

  @Field()
  token: string;
}
