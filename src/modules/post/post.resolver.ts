import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Author } from 'src/decorator/author.decorator';
import { roles } from 'src/interface/role.interface';
import { Slugify } from 'src/util/utilities';
import { Auth } from '../../decorator/auth.decorator';
import { AuthorDocument } from '../author/author.model';
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
  async CreatePost(
    @Args('payload')
    payload: CreatePostInput,
    @Author() author: AuthorDocument,
  ) {
    return await this.postService.create(
      {
        ...payload,
        slug: payload.slug ? payload.slug : Slugify(payload.title),
      },
      author._id,
    );
  }

  @Mutation(() => Post)
  @Auth(roles.member, roles.admin)
  async UpdatePost(
    @Args('payload')
    payload: UpdatePostInput,
  ) {
    return await this.postService.update({
      ...payload,
      slug: payload.slug ? payload.slug : Slugify(payload.title),
    });
  }

  @Mutation(() => Post)
  @Auth(roles.member, roles.admin)
  async DeletePost(
    @Args('payload') payload: DeletePostInput,
    @Author() author: AuthorDocument,
  ) {
    return await this.postService.delete(payload, author._id);
  }
}
