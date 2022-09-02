import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { roles } from 'src/interface/role.interface';
import { Slugify } from 'src/util/utilities';
import { Auth } from '../../decorator/auth.decorator';
import { Author } from '../author/author.model';
import { Author as InjectAuthor } from 'src/decorator/author.decorator';
import {
  CreatePostInput,
  DeletePostInput,
  GetPostInput,
  UpdatePostInput,
} from './post.input';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Post_Tag } from './post_tag.model';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  async ShowAllPost() {
    return await this.postService.getAll();
  }

  @ResolveField()
  async posts(@Parent() tags: Post_Tag) {
    // await author.populate({ path: 'posts', model: Post.name }).execPopulate(); pending: relasi
    // return author.posts;
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
    @InjectAuthor() author: Author,
  ) {
    return await this.postService.create({
      ...payload,
      slug: payload.slug ? payload.slug : Slugify(payload.title),
      author: author.id,
    });
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
    // @Author() author: AuthorDocument,
  ) {
    return await this.postService.delete(payload);
  }
}
