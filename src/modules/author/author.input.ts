import { Field, InputType, Int } from '@nestjs/graphql';

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
  @Field(() => Int)
  id: number;
}

@InputType()
export class UpdateAuthorInput {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class DeleteAuthorInput {
  @Field(() => Int)
  id: number;
}
