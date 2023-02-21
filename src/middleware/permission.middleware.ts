import { ForbiddenException } from '@nestjs/common';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const checkPermission: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const { info } = ctx;
  const { extensions } = info.parentType.getFields()[info.fieldName];

  if (
    !(extensions.roles as []).includes(ctx.context.req.author.role as never)
  ) {
    throw new ForbiddenException(
      `User does not have sufficient permissions to access "${info.fieldName}" field.`,
    );
  }
  return next();
};
