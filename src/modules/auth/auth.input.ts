import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class ForgotPasswordInput {
  @Field()
  email: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  newPassword: string;

  @Field(() => Int)
  authorID: number;

  @Field()
  token: string;
}

@InputType()
export class VerifyEmailInput {
  @Field()
  code: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field()
  newPassword: string;

  @Field()
  currentPassword: string;
}
