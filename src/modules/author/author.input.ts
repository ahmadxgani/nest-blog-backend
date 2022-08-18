import { Field, InputType, Int } from '@nestjs/graphql';
import { Post } from '../post/post.model';

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

  @Field(() => [String])
  posts: Post[];
}

@InputType()
export class DeleteAuthorInput {
  @Field(() => Int)
  id: number;
}
