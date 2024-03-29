import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Return Response Type' })
export class ResponseType {
  @Field(() => Boolean)
  success: boolean;
}
