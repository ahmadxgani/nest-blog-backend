import {
  Field,
  InputType,
  Int,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

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
export class GetAuthorIdInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class UpdateAuthorInput extends IntersectionType(
  PartialType(OmitType(CreateAuthorInput, ['email', 'password'] as const)),
  GetAuthorIdInput,
) {}

@InputType()
export class ChangePasswordInput {
  @Field(() => Int)
  id: number;
  @Field()
  password: string;
}
