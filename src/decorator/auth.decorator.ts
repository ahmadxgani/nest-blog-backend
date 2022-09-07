import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guard/roles.guard';
import { roles } from 'src/interface/role.interface';

export const Auth = (...roles: roles[]) =>
  applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
