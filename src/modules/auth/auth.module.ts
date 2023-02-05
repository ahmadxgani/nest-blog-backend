import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_KEY'),
        signOptions: {
          expiresIn: config.get<string>('EXPIRES_IN'),
        },
      }),
    }),
    AuthorModule,
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
