import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import ms from 'ms';

import { AuthorId as InjectAuthor } from 'src/decorator/author.decorator';
import { LoginType, MessageType } from 'src/classType/auth.classType';
import { Public } from 'src/decorator/public.decorator';

import { Author } from '../author/author.entity';
import { CreateAuthorInput } from '../author/author.input';
import {
  ForgotPasswordInput,
  LoginInput,
  ResetPasswordInput,
  UpdatePasswordInput,
  VerifyEmailInput,
} from './auth.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => LoginType)
  async login(
    @Args('payload') payload: LoginInput,
    @Context('req') req: Request,
  ) {
    const data = await this.authService.login(payload);
    req.res?.cookie('token', data.token, {
      expires: new Date(
        Date.now() + (ms(process.env.EXPIRES_IN as string) as number),
      ),
      sameSite: 'none',
      secure: true,
    });
    delete data.token;
    return data;
  }

  @Public()
  @Mutation(() => Author)
  createAccount(@Args('payload') payload: CreateAuthorInput) {
    return this.authService.create(payload);
  }

  @Mutation(() => MessageType)
  @Public()
  verifyEmail(@Args('payload') payload: VerifyEmailInput) {
    this.authService.verifyEmail(payload.code);
    return {
      message: 'success',
    };
  }

  @Public()
  @Query(() => MessageType)
  forgotPassword(@Args('payload') payload: ForgotPasswordInput) {
    this.authService.forgotPassword(payload.email);
    return {
      message:
        'check your email, verification link has been successfuly sent to your email!',
    };
  }

  @Public()
  @Mutation(() => MessageType)
  unregisterUser(@Args('payload') payload: VerifyEmailInput) {
    this.authService.unregisterUser(payload.code);
    return {
      message: 'The account delete was successful',
    };
  }

  @Public()
  @Mutation(() => MessageType)
  resetPassword(@Args('payload') payload: ResetPasswordInput) {
    this.authService.resetPassword(payload);
    return {
      message: 'Password has been successfully changed, Please login',
    };
  }

  @Mutation(() => MessageType)
  updatePassword(
    @InjectAuthor() authorID: number,
    @Args('payload') payload: UpdatePasswordInput,
  ) {
    this.authService.updatePassword({ ...payload, id: authorID });

    return {
      message: 'Password update was successful.',
    };
  }
}
