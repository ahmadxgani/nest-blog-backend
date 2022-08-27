import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './modules/post/post.module';
import { AuthorModule } from './modules/author/author.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Post } from './modules/post/post.model';
import { Author } from './modules/author/author.model';
import { Tag } from './modules/post/tag.model';
import { Post_Tag } from './modules/post/post_tag.model';

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
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: process.env.DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PostModule,
    AuthorModule,
    AuthModule,
  ],
})
export class AppModule {}
