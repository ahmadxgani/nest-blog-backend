import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { TagService } from './tag.service';
import { roles } from 'src/interface/role.interface';
import { Auth } from 'src/decorator/auth.decorator';
import { Tag } from './tag.entity';
import {
  CreateTagInput,
  DeleteTagInput,
  GetByTagInput,
  UpdateTagInput,
} from './tag.input';
import { ResponseType } from 'src/classType/delete.classType';
import { Post } from '../post/post.entity';
import { PostService } from '../post/post.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(
    private tagService: TagService,
    private postService: PostService,
  ) {}

  @ResolveField(() => [Post])
  async posts(@Root() tag: Tag) {
    return this.postService.getPostByTag(tag.name);
  }

  @Query(() => [Tag])
  async showAllTag() {
    return await this.tagService.getAllTag();
  }

  @Query(() => Tag)
  async showByTag(@Args('payload') { name }: GetByTagInput) {
    return await this.tagService.readTag(name);
  }

  @Mutation(() => Tag)
  @Auth(roles.admin)
  async createTag(
    @Args('payload')
    payload: CreateTagInput,
  ) {
    return await this.tagService.createTag(payload);
  }

  @Mutation(() => Tag)
  @Auth(roles.admin)
  async updateTag(
    @Args('payload')
    payload: UpdateTagInput,
  ) {
    return await this.tagService.updateTag(payload);
  }

  @Mutation(() => ResponseType)
  @Auth(roles.admin)
  async deleteTag(@Args('payload') payload: DeleteTagInput) {
    await this.tagService.deleteTag(payload);
    return {
      success: true,
    };
  }
}
