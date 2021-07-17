import {
  CreateAuthorInput,
  DeleteAuthorInput,
  GetAuthorInput,
  UpdateAuthorInput,
} from './author.input';
import { Args, Mutation, Resolver, Query, ResolveField } from '@nestjs/graphql';
import { Author, AuthorDocument } from './author.model';
import { AuthorService } from './author.service';
import { Parent } from '@nestjs/graphql';
import { Post } from '../post/post.model';
import { roles } from 'src/interface/role.interface';
import { Auth } from '../auth/auth.decorator';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private authorService: AuthorService) {}

  @Mutation(() => Author)
  async CreateAuthor(@Args('payload') payload: CreateAuthorInput) {
    return await this.authorService.create(payload);
  }

  @Query(() => [Author])
  async GetAuthorById(@Args('payload') payload: GetAuthorInput) {
    return await this.authorService.read('_id', payload._id);
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

  @Mutation(() => Author)
  async DeleteAuthor(@Args('payload') payload: DeleteAuthorInput) {
    return await this.authorService.delete(payload);
  }

  @ResolveField()
  async posts(@Parent() author: AuthorDocument) {
    await author.populate({ path: 'posts', model: Post.name }).execPopulate();
    return author.posts;
  }
}
