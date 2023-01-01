import { Author as InjectAuthor } from 'src/decorator/author.decorator';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  constructor(private authService: AuthService) {}

  @Public()
  @Query(() => LoginType)
  async login(@Args('payload') payload: LoginInput) {
    return await this.authService.login(payload);
  }

  @Public()
  @Mutation(() => Author)
  async createAccount(@Args('payload') payload: CreateAuthorInput) {
    return await this.authService.create(payload);
  }

  @Mutation(() => MessageType)
  @Public()
  async verifyEmail(@Args('payload') payload: VerifyEmailInput) {
    this.authService.verifyEmail(payload.code);
    return {
      message: 'success',
    };
  }

  @Public()
  @Query(() => MessageType)
  async forgotPassword(@Args('payload') payload: ForgotPasswordInput) {
    await this.authService.forgotPassword(payload.email);
    return {
      message:
        'check your email, verification link has been successfuly sent to your email!',
    };
  }

  @Public()
  @Mutation(() => MessageType)
  async unregisterUser(@Args('payload') payload: VerifyEmailInput) {
    this.authService.unregisterUser(payload.code);
    return {
      message: 'The account delete was successful',
    };
  }

  @Public()
  @Mutation(() => MessageType)
  async resetPassword(@Args('payload') payload: ResetPasswordInput) {
    await this.authService.resetPassword(payload);
    return {
      message: 'Password has been successfully changed, Please login',
    };
  }

  @Mutation(() => MessageType)
  async updatePassword(
    @InjectAuthor() author: Author,
    @Args('payload') payload: UpdatePasswordInput,
  ) {
    await this.authService.updatePassword(author, payload);

    return {
      message: 'Password update was successful.',
    };
  }
}
