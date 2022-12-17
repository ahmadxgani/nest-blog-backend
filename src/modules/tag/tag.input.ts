import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field()
  name: string;
}

@InputType()
export class GetTagInput {
  @Field()
  by: string;

  @Field()
  value: string;
}

@InputType()
export class GetByTagInput {
  @Field()
  name: string;
}

@InputType()
export class GetTagByIdInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class UpdateTagInput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@InputType()
export class DeleteTagInput {
  @Field(() => Int)
  id: number;
}
