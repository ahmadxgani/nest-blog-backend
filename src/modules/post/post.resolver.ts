import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Slugify } from 'src/util/utilities';
import { Author } from '../author/author.entity';
import { Author as InjectAuthor } from 'src/decorator/author.decorator';
import {
  CreatePostInput,
  DeletePostInput,
  GetLikePost,
  GetPostBySlugInput,
  LikePostInput,
  UpdatePostInput,
} from './post.input';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { Public } from 'src/decorator/public.decorator';
import { ResponseType } from 'src/classType/delete.classType';
import { UseGuards } from '@nestjs/common';
import { IsOwnedPost } from 'src/guard/isOwnedPost.guard';
import { LikePost } from './like.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  @Public()
  async ShowAllPost() {
    return await this.postService.getAll();
  }

  @Query(() => LikePost, { nullable: true })
  async LikedPost(
    @Args('payload') payload: GetLikePost,
    @InjectAuthor() author: Author,
  ) {
    return await this.postService.getLikePost(payload.id, author.id);
  }

  @Query(() => Post)
  @Public()
  async GetPost(@Args('payload') payload: GetPostBySlugInput) {
    return await this.postService.read('slug', payload.slug);
  }

  @Mutation(() => Post)
  async LikePost(
    @Args('payload') payload: LikePostInput,
    @InjectAuthor() author: Author,
  ) {
    return await this.postService.likePost(payload.idPost, author);
  }

  @Mutation(() => Post)
  async CreatePost(
    @Args('payload')
    payload: CreatePostInput,
    @InjectAuthor() author: Author,
  ) {
    return await this.postService.create({
      ...payload,
      slug: payload.slug ? payload.slug : (Slugify(payload.title) as string),
      author: author,
    });
  }

  @Mutation(() => Post)
  @UseGuards(IsOwnedPost)
  async UpdatePost(
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
  async DeletePost(@Args('payload') payload: DeletePostInput) {
    await this.postService.delete(payload);
    return {
      success: true,
    };
  }
}
