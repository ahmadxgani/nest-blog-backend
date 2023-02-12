import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Slugify } from 'src/util/utilities';
import { AuthorId as InjectAuthor } from 'src/decorator/author.decorator';
import {
  CreatePostInput,
  GetPostByIdInput,
  GetPostBySlugInput,
  UpdatePostInput,
} from './post.input';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { Public } from 'src/decorator/public.decorator';
import { ResponseType } from 'src/classType/delete.classType';
import { UseGuards } from '@nestjs/common';
import { IsOwnedPost } from 'src/guard/isOwnedPost.guard';
import { Author } from '../author/author.entity';
import { Tag } from '../tag/tag.entity';
import { AuthorService } from '../author/author.service';
import { LikeService } from '../like/like.service';
import { Like } from '../like/entities/like.entity';
import { TagService } from '../tag/tag.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private authorService: AuthorService,
    private likeService: LikeService,
    private tagService: TagService,
  ) {}

  @Query(() => [Post])
  @Public()
  showAllPost() {
    return this.postService.getAll();
  }

  @Query(() => Post)
  @Public()
  getPost(@Args('payload') payload: GetPostBySlugInput) {
    return this.postService.read('slug', payload.slug);
  }

  @Mutation(() => Post)
  createPost(
    @Args('payload')
    payload: CreatePostInput,
    @InjectAuthor() authorID: number,
  ) {
    return this.postService.create({
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
    return this.postService.update(payload);
  }

  @Mutation(() => ResponseType)
  @UseGuards(IsOwnedPost)
  deletePost(@Args('payload') payload: GetPostByIdInput) {
    this.postService.delete(payload);
    return {
      success: true,
    };
  }

  @ResolveField(() => [Tag])
  tags(@Parent() post: Post) {
    return this.tagService.getTagByPost(post.id);
  }

  @ResolveField(() => Author)
  author(@Parent() post: Post) {
    return this.authorService.getAuthor(post.id);
  }

  @ResolveField(() => Like)
  like(@Parent() post: Post) {
    return this.likeService.getLikedPost(post.id);
  }
}
