import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { ResponseType, Slugify } from 'src/util/utilities';
import { Author } from '../author/author.model';
import { Author as InjectAuthor } from 'src/decorator/author.decorator';
import {
  CreatePostInput,
  DeletePostInput,
  GetPostByIdInput,
  UpdatePostInput,
} from './post.input';
import {
  CreateTagInput,
  DeleteTagInput,
  GetByTagInput,
  UpdateTagInput,
} from './tag.input';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Tag } from './tag.model';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Tag])
  async ShowAllTag() {
    return await this.postService.getAllTag();
  }

  @Query(() => Tag)
  async ShowByTag(@Args('payload') { name }: GetByTagInput) {
    return await this.postService.readTag(name);
  }

  @Mutation(() => Tag)
  async CreateTag(
    @Args('payload')
    payload: CreateTagInput,
  ) {
    return await this.postService.createTag(payload);
  }

  @Mutation(() => Tag)
  async UpdateTag(
    @Args('payload')
    payload: UpdateTagInput,
  ) {
    return await this.postService.updateTag(payload);
  }

  @Mutation(() => ResponseType)
  async DeleteTag(@Args('payload') payload: DeleteTagInput) {
    await this.postService.deleteTag(payload);
    return {
      success: true,
    };
  }

  @Query(() => [Post])
  async ShowAllPost() {
    return await this.postService.getAll();
  }

  @Query(() => Post)
  async GetPost(@Args('payload') payload: GetPostByIdInput) {
    return await this.postService.readById(payload.id);
  }

  @Mutation(() => Post)
  async CreatePost(
    @Args('payload')
    payload: CreatePostInput,
    @InjectAuthor() author: Author,
  ) {
    return await this.postService.create({
      ...payload,
      slug: payload.slug ? payload.slug : Slugify(payload.title),
      author: author,
    });
  }

  @Mutation(() => Post)
  async UpdatePost(
    @Args('payload')
    payload: UpdatePostInput,
  ) {
    return await this.postService.update({
      ...payload,
      slug: payload.slug ? payload.slug : Slugify(payload.title),
    });
  }

  @Mutation(() => ResponseType)
  async DeletePost(@Args('payload') payload: DeletePostInput) {
    await this.postService.delete(payload);
    return {
      success: true,
    };
  }
}
