import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CreatePostInput } from './post.input';
import { Post } from './post.model';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => Post)
  async ShowAllPost() {
    return await this.postService.read();
  }

  @Mutation(() => Post)
  async CreatePost(@Args('payload') payload: CreatePostInput) {
    return await this.postService.create(payload);
  }
}
