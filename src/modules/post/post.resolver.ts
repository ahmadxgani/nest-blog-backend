import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { roles } from 'src/interface/role.interface';
import { Auth } from '../auth/auth.decorator';
import {
  CreatePostInput,
  DeletePostInput,
  GetPostInput,
  UpdatePostInput,
} from './post.input';
import { Post } from './post.model';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  async ShowAllPost() {
    return await this.postService.read();
  }

  @Query(() => [Post])
  async GetPost(@Args('payload') payload: GetPostInput) {
    return await this.postService.read(payload.by, payload.value);
  }

  @Mutation(() => Post)
  @Auth(roles.member, roles.admin)
  async CreatePost(@Args('payload') payload: CreatePostInput) {
    return await this.postService.create(payload);
  }

  @Mutation(() => Post)
  @Auth(roles.member, roles.admin)
  async UpdatePost(@Args('payload') payload: UpdatePostInput) {
    return await this.postService.update(payload);
  }

  @Mutation(() => Post)
  @Auth(roles.member, roles.admin)
  async DeletePost(@Args('payload') payload: DeletePostInput) {
    return await this.postService.delete(payload);
  }
}
