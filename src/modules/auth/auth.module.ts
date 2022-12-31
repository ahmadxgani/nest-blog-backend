import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/jwt/strategy.jwt';
import { AuthorModule } from '../author/author.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'author',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN,
      },
    }),
    forwardRef(() => AuthorModule),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
