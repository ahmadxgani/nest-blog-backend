import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './modules/post/post.module';
import { AuthorModule } from './modules/author/author.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: false,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      autoCreate: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    PostModule,
    AuthorModule,
    AuthModule,
  ],
})
export class AppModule {}
