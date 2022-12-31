import { GetAuthorIdInput, UpdateAuthorInput } from './author.input';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import { roles } from 'src/interface/role.interface';
import { Auth } from '../../decorator/auth.decorator';
import { ResponseType } from 'src/classType/delete.classType';
import { FileUpload } from 'graphql-upload/processRequest.js';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private authorService: AuthorService) {}

  @Query(() => Author)
  async GetAuthorById(@Args('payload') payload: GetAuthorIdInput) {
    return await this.authorService.readById(payload.id);
  }

  @Query(() => [Author])
  @Auth(roles.admin)
  async ShowAllAuthor() {
    return await this.authorService.readAll();
  }

  @Mutation(() => Author)
  async UpdateAuthor(
    @Args('payload') payload: UpdateAuthorInput,
    @Args({ name: 'file', type: () => GraphQLUpload, nullable: true })
    { createReadStream }: FileUpload,
  ) {
    return await this.authorService.update(payload, createReadStream);
  }

  @Mutation(() => ResponseType)
  async DeleteAuthor(@Args('payload') payload: GetAuthorIdInput) {
    await this.authorService.delete(payload);
    return {
      success: true,
    };
  }
}
