import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import ms from 'ms';

import { AuthorId as InjectAuthor } from 'src/decorator/author.decorator';
import { LoginType } from 'src/classType/auth.classType';
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
import { ResponseType } from 'src/classType/common.classType';

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
      httpOnly: true,
    });
    delete data.token;
    return data;
  }

  @Mutation(() => ResponseType)
  logout(@Context('req') req: Request) {
    req.res?.cookie('token', 'destroyed', {
      expires: new Date(0),
    });
    return {
      message: 'The user was successfully logged out.',
    };
  }

  @Public()
  @Mutation(() => Author)
  createAccount(@Args('payload') payload: CreateAuthorInput) {
    return this.authService.create(payload);
  }

  @Mutation(() => ResponseType)
  @Public()
  verifyEmail(@Args('payload') payload: VerifyEmailInput) {
    this.authService.verifyEmail(payload.code);
    return {
      message: 'success',
    };
  }

  @Public()
  @Query(() => ResponseType)
  forgotPassword(@Args('payload') payload: ForgotPasswordInput) {
    this.authService.forgotPassword(payload.email);
    return {
      message:
        'check your email, verification link has been successfuly sent to your email!',
    };
  }

  @Public()
  @Mutation(() => ResponseType)
  unregisterUser(@Args('payload') payload: VerifyEmailInput) {
    this.authService.unregisterUser(payload.code);
    return {
      message: 'The account delete was successful',
    };
  }

  @Public()
  @Mutation(() => ResponseType)
  resetPassword(@Args('payload') payload: ResetPasswordInput) {
    this.authService.resetPassword(payload);
    return {
      message: 'Password has been successfully changed, Please login',
    };
  }

  @Mutation(() => ResponseType)
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
