import { GetAuthorIdInput, UpdateAuthorInput } from './author.input';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import { roles } from 'src/interface/role.interface';
import { Auth } from '../../decorator/auth.decorator';
import { ResponseType } from 'src/classType/delete.classType';
import { FileUpload } from 'graphql-upload/processRequest.js';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { AuthorId } from 'src/decorator/author.decorator';
import { Post } from '../post/post.entity';
import { Tag } from '../tag/tag.entity';
import { PostService } from '../post/post.service';
import { BookmarkService } from '../bookmark/bookmark.service';
import { Bookmark } from '../bookmark/entities/bookmark.entity';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private readonly postService: PostService,
    private readonly authorService: AuthorService,
    private readonly bookmarkService: BookmarkService,
  ) {}

  @Query(() => Author)
  getAuthorById(@Args('payload') payload: GetAuthorIdInput) {
    return this.authorService.readById(payload.id);
  }

  @Query(() => Author)
  loggedInAuthor(@AuthorId() authorID: number) {
    return this.authorService.readById(authorID);
  }

  @Query(() => [Author])
  @Auth(roles.admin)
  showAllAuthor() {
    return this.authorService.readAll();
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args('payload') payload: UpdateAuthorInput,
    @Args({ name: 'file', type: () => GraphQLUpload, nullable: true })
    { createReadStream }: FileUpload,
  ) {
    return this.authorService.update(payload, createReadStream);
  }

  @Mutation(() => ResponseType)
  deleteAuthor(@Args('payload') payload: GetAuthorIdInput) {
    this.authorService.delete(payload);
    return {
      success: true,
    };
  }

  @ResolveField(() => [Post])
  posts(@Parent() author: Author) {
    console.log(author);

    return this.postService.getPostByAuthor(author.username);
  }

  @ResolveField(() => [Bookmark])
  bookmarks(@Parent() author: Author) {
    return this.bookmarkService.getBookmarkedPost(author.id);
  }
}
