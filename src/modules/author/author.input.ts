// import { Stream } from 'stream';
// import { GraphQLUpload } from 'graphql-upload';
import {
  Field,
  InputType,
  Int,
  IntersectionType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
// interface FileUpload {
//   filename: string;
//   mimetype: string;
//   encoding: string;
//   createReadStream: () => Stream;
// }
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
