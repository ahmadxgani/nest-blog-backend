import { Field, InputType, registerEnumType } from '@nestjs/graphql';

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
  id: number;
}

@InputType()
export class UpdateAuthorInput {
  @Field(() => String)
  id: number;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => [String])
  posts: number[];
}

@InputType()
export class DeleteAuthorInput {
  @Field(() => String)
  id: number;
}
