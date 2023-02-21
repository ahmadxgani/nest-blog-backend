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
import { TagModule } from './modules/tag/tag.module';
import { LikeModule } from './modules/like/like.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { ComplexityPlugin } from './util/complexity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      fieldResolverEnhancers: ['guards'],
      sortSchema: true,
      debug: false,
      playground: true,
      cors: {
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_DIALECT as 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
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
    TagModule,
    LikeModule,
    BookmarkModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PassportGuard,
    },
    ComplexityPlugin,
  ],
})
export class AppModule {}
