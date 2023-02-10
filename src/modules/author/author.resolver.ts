import { GetAuthorIdInput, UpdateAuthorInput } from './author.input';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import { roles } from 'src/interface/role.interface';
import { Auth } from '../../decorator/auth.decorator';
import { ResponseType } from 'src/classType/delete.classType';
import { FileUpload } from 'graphql-upload/processRequest.js';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { AuthorId } from 'src/decorator/author.decorator';
import { PostService } from '../post/post.service';
import { Post } from '../post/post.entity';
import { Tag } from '../tag/tag.entity';
import { TagService } from '../tag/tag.service';
import { LikePost } from '../post/like.entity';
import { BookmarkPost } from '../post/bookmark.entity';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private authorService: AuthorService,
    private postService: PostService,
    private tagService: TagService,
  ) {}

  @Query(() => Author)
  async getAuthorById(@Args('payload') payload: GetAuthorIdInput) {
    return await this.authorService.readById(payload.id);
  }

  @Query(() => Author)
  async loggedInAuthor(@AuthorId() authorID: number) {
    return await this.authorService.readById(authorID);
  }

  @Query(() => [Author])
  @Auth(roles.admin)
  async showAllAuthor() {
    return await this.authorService.readAll();
  }

  @Mutation(() => Author)
  async updateAuthor(
    @Args('payload') payload: UpdateAuthorInput,
    @Args({ name: 'file', type: () => GraphQLUpload, nullable: true })
    { createReadStream }: FileUpload,
  ) {
    return await this.authorService.update(payload, createReadStream);
  }

  @Mutation(() => ResponseType)
  async deleteAuthor(@Args('payload') payload: GetAuthorIdInput) {
    await this.authorService.delete(payload);
    return {
      success: true,
    };
  }

  @ResolveField(() => [Post])
  async posts(@Root() author: Author) {
    return await this.postService.getPostByAuthor(author.username);
  }

  @ResolveField(() => [Tag])
  async tags(@Root() post: Post) {
    return await this.tagService.getTagByPost(post.id);
  }

  @ResolveField(() => [BookmarkPost])
  async bookmarks(@Root() author: Author) {
    return await this.postService.getBookmarkedPost(author.id);
  }

  @ResolveField(() => [LikePost])
  async likes(@Root() post: Post) {
    return await this.postService.getLikePost(post.id);
  }
}
