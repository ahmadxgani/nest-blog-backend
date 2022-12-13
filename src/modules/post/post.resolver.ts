import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { ResponseType, Slugify } from 'src/util/utilities';
import { Author } from '../author/author.entity';
import { Author as InjectAuthor } from 'src/decorator/author.decorator';
import {
  CreatePostInput,
  DeletePostInput,
  GetPostBySlugInput,
  UpdatePostInput,
} from './post.input';
import {
  CreateTagInput,
  DeleteTagInput,
  GetByTagInput,
  UpdateTagInput,
} from './tag.input';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { Tag } from './tag.entity';
import { Public } from 'src/decorator/public.decorator';
import { roles } from 'src/interface/role.interface';
import { Auth } from 'src/decorator/auth.decorator';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Tag])
  @Auth(roles.admin)
  async ShowAllTag() {
    return await this.postService.getAllTag();
  }

  @Query(() => Tag)
  async ShowByTag(@Args('payload') { name }: GetByTagInput) {
    return await this.postService.readTag(name);
  }

  @Mutation(() => Tag)
  @Auth(roles.admin)
  async CreateTag(
    @Args('payload')
    payload: CreateTagInput,
  ) {
    return await this.postService.createTag(payload);
  }

  @Mutation(() => Tag)
  @Auth(roles.admin)
  async UpdateTag(
    @Args('payload')
    payload: UpdateTagInput,
  ) {
    return await this.postService.updateTag(payload);
  }

  @Mutation(() => ResponseType)
  @Auth(roles.admin)
  async DeleteTag(@Args('payload') payload: DeleteTagInput) {
    await this.postService.deleteTag(payload);
    return {
      success: true,
    };
  }

  @Query(() => [Post])
  @Public()
  async ShowAllPost() {
    return await this.postService.getAll();
  }

  @Query(() => Post)
  @Public()
  async GetPost(@Args('payload') payload: GetPostBySlugInput) {
    return await this.postService.read('slug', payload.slug);
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
  async UpdatePost(
    @Args('payload')
    payload: UpdatePostInput,
    @InjectAuthor() author: Author,
  ) {
    return this.postService.update(
      {
        ...payload,
        slug: payload.slug ? payload.slug : Slugify(payload.title),
      },
      author,
    );
  }

  @Mutation(() => ResponseType)
  async DeletePost(
    @Args('payload') payload: DeletePostInput,
    @InjectAuthor() author: Author,
  ) {
    await this.postService.delete(payload, author);
    return {
      success: true,
    };
  }
}
