import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { tags } from 'src/interface/tags.interface';
import { Post } from '../post/post.model';

registerEnumType(tags, { name: 'tags' });

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
  posts: Post[];
}

@InputType()
export class DeleteAuthorInput {
  @Field(() => String)
  id: number;
}
