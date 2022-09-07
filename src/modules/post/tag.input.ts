import { Field, InputType } from '@nestjs/graphql';

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
export class GetTagByIdInput {
  @Field()
  id: number;
}

@InputType()
export class UpdateTagInput {
  @Field()
  id: number;

  @Field()
  name: string;
}

@InputType()
export class DeleteTagInput {
  @Field()
  id: number;
}
