import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthorService } from 'src/modules/author/author.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AuthorService) private readonly AuthorService: AuthorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const roles = this.reflector.get('roles', ctx.getHandler());
    const req = ctx.getContext().req;
    const author = await this.AuthorService.readById(req.author.id);
    return roles.includes(author?.role);
  }
}
