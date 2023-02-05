import { createParamDecorator } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthorId = createParamDecorator(
  (_, ctx: ExecutionContext) =>
    GqlExecutionContext.create(ctx).getContext().req.author.id,
);
