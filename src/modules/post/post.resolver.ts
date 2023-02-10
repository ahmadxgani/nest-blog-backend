import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
  Root,
} from '@nestjs/graphql';
import { Slugify } from 'src/util/utilities';
import { AuthorId as InjectAuthor } from 'src/decorator/author.decorator';
import {
  CreatePostInput,
  DeletePostInput,
  GetPostBySlugInput,
  IdPostInput,
  UpdatePostInput,
} from './post.input';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { Public } from 'src/decorator/public.decorator';
import { ResponseType } from 'src/classType/delete.classType';
import { UseGuards } from '@nestjs/common';
import { IsOwnedPost } from 'src/guard/isOwnedPost.guard';
import { LikePost } from './like.entity';
import { BookmarkPost } from './bookmark.entity';
import { Author } from '../author/author.entity';
import { Tag } from '../tag/tag.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  @Public()
  async showAllPost() {
    return await this.postService.getAll();
  }

  @Mutation(() => BookmarkPost)
  async bookmarkPost(
    @Args('payload') payload: IdPostInput,
    @InjectAuthor() authorID: number,
  ) {
    return await this.postService.bookmarkPost(payload.idPost, authorID);
  }

  @Query(() => BookmarkPost)
  async isPostBookmarked(@Args('payload') payload: IdPostInput) {
    return this.postService.checkIfPostBookmarked(payload.idPost);
  }

  @Query(() => Post)
  @Public()
  async getPost(@Args('payload') payload: GetPostBySlugInput) {
    return await this.postService.read('slug', payload.slug);
  }

  @Mutation(() => Post)
  async likePost(
    @Args('payload') payload: IdPostInput,
    @InjectAuthor() authorID: number,
  ) {
    return await this.postService.likePost(payload.idPost, authorID);
  }

  @Mutation(() => Post)
  async createPost(
    @Args('payload')
    payload: CreatePostInput,
    @InjectAuthor() authorID: number,
  ) {
    return await this.postService.create({
      ...payload,
      slug: payload.slug ? payload.slug : (Slugify(payload.title) as string),
      authorID,
    });
  }

  @Mutation(() => Post)
  @UseGuards(IsOwnedPost)
  async updatePost(
    @Args('payload')
    payload: UpdatePostInput,
  ) {
    return this.postService.update({
      ...payload,
      slug: payload.slug ? payload.slug : Slugify(payload.title),
    });
  }

  @Mutation(() => ResponseType)
  @UseGuards(IsOwnedPost)
  async deletePost(@Args('payload') payload: DeletePostInput) {
    await this.postService.delete(payload);
    return {
      success: true,
    };
  }

  @ResolveField(() => Author)
  async author(@Parent() post: Post) {
    return this.postService.getAuthor(post.id);
  }

  @ResolveField(() => [Post])
  async posts(@Parent() bookmark: BookmarkPost) {
    return this.postService.getPosts(bookmark.id);
  }

  @ResolveField(() => [Tag])
  async tags(@Parent() post: Post) {
    return this.postService.getTag(post.id);
  }

  @ResolveField(() => [LikePost])
  async likes(@Root() post: Post) {
    return await this.postService.getLikePost(post.id);
  }
}
