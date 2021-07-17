import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PassportGuard } from 'src/guard/passport.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { roles } from 'src/interface/role.interface';

export const Auth = (...roles: roles[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(PassportGuard, RolesGuard),
  );
