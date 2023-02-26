import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginType {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  image: string;
}
