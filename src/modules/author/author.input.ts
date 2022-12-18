import {
  Field,
  InputType,
  Int,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import GraphQLUpload, { FileUpload } from 'graphql-upload/GraphQLUpload.js';

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
export class UpdateAuthorInput extends IntersectionType(
  PartialType(OmitType(CreateAuthorInput, ['email', 'password'] as const)),
  GetAuthorInput,
) {
  @Field(() => GraphQLUpload, { nullable: true })
  file?: FileUpload;
}

@InputType()
export class ChangePasswordInput {
  @Field(() => Int)
  id: number;
  @Field()
  password: string;
}

@InputType()
export class DeleteAuthorInput extends PickType(GetAuthorInput, [
  'id',
] as const) {}
