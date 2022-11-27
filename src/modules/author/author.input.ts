import {
  Field,
  InputType,
  Int,
  IntersectionType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
// import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
// import type { FileUpload } from 'graphql-upload/processRequest.mjs';

@InputType()
export class CreateAuthorInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  // @Field(() => GraphQLUpload)
  // image: Promise<FileUpload>;
}

@InputType()
export class GetAuthorInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class UpdateAuthorInput extends IntersectionType(
  OmitType(CreateAuthorInput, ['email'] as const),
  GetAuthorInput,
) {}

@InputType()
export class DeleteAuthorInput extends PickType(GetAuthorInput, [
  'id',
] as const) {}
