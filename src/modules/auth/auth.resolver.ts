import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginType } from 'src/classType/login.classType';
import { Public } from 'src/decorator/public.decorator';
import { LoginInput } from './auth.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => LoginType)
  async login(@Args('payload') payload: LoginInput) {
    return await this.authService.login(payload);
  }
}
