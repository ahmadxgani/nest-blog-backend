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
  name: string;

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
  PartialType(OmitType(CreateAuthorInput, ['email', 'password'])),
  GetAuthorIdInput,
) {}

@InputType()
export class ChangePasswordInput extends IntersectionType(
  GetAuthorIdInput,
  PickType(CreateAuthorInput, ['password']),
) {}
