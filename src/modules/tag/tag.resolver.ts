import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
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

  @Query(() => [Tag])
  showAllTag() {
    return this.tagService.getAllTag();
  }

  @Query(() => Tag)
  showByTag(@Args('payload') { name }: GetByTagInput) {
    return this.tagService.readTag(name);
  }

  @Mutation(() => Tag)
  @Auth(roles.admin)
  createTag(
    @Args('payload')
    payload: CreateTagInput,
  ) {
    return this.tagService.createTag(payload);
  }

  @Mutation(() => Tag)
  @Auth(roles.admin)
  updateTag(
    @Args('payload')
    payload: UpdateTagInput,
  ) {
    return this.tagService.updateTag(payload);
  }

  @Mutation(() => ResponseType)
  @Auth(roles.admin)
  deleteTag(@Args('payload') payload: DeleteTagInput) {
    this.tagService.deleteTag(payload);
    return {
      success: true,
    };
  }

  @ResolveField(() => [Post])
  posts(@Parent() tag: Tag) {
    return this.postService.getPostByTag(tag.name);
  }
}
