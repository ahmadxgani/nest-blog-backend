import {
  CreateAuthorInput,
  DeleteAuthorInput,
  GetAuthorInput,
  UpdateAuthorInput,
} from './author.input';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Author } from './author.model';
import { AuthorService } from './author.service';
import { roles } from 'src/interface/role.interface';
import { Auth } from '../../decorator/auth.decorator';
import { Public } from 'src/decorator/public.decorator';
import { ResponseType } from 'src/util/utilities';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private authorService: AuthorService) {}

  @Public()
  @Mutation(() => Author)
  async CreateAuthor(@Args('payload') payload: CreateAuthorInput) {
    return await this.authorService.create(payload);
  }

  @Query(() => Author)
  async GetAuthorById(@Args('payload') payload: GetAuthorInput) {
    return await this.authorService.readById(payload.id);
  }

  @Query(() => [Author])
  @Auth(roles.admin)
  async ShowAllAuthor() {
    return await this.authorService.readAll();
  }

  @Mutation(() => Author)
  async UpdateAuthor(@Args('payload') payload: UpdateAuthorInput) {
    return await this.authorService.update(payload);
  }

  @Mutation(() => ResponseType)
  async DeleteAuthor(@Args('payload') payload: DeleteAuthorInput) {
    await this.authorService.delete(payload);
    return {
      response: true,
    };
  }
}
