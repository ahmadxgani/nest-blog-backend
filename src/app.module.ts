// @ts-nocheck
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthorModule } from './modules/author/author.module';
import { PostModule } from './modules/post/post.module';
import { PassportGuard } from 'src/guard/passport.guard';
import { AuthModule } from './modules/auth/auth.module';
import { ImageModule } from './modules/image/image.module';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: false,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.ts'],
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),
    PostModule,
    AuthorModule,
    AuthModule,
    ImageModule,
    TagModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PassportGuard,
    },
  ],
})
export class AppModule {}
