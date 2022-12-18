import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

@Resolver()
export class TagResolver {
  constructor(private tagService: TagService) {}
  @Query(() => [Tag])
  async ShowAllTag() {
    console.log(await this.tagService.getAllTag());

    return await this.tagService.getAllTag();
  }

  @Query(() => Tag)
  async ShowByTag(@Args('payload') { name }: GetByTagInput) {
    return await this.tagService.readTag(name);
  }

  @Mutation(() => Tag)
  @Auth(roles.admin)
  async CreateTag(
    @Args('payload')
    payload: CreateTagInput,
  ) {
    return await this.tagService.createTag(payload);
  }

  @Mutation(() => Tag)
  @Auth(roles.admin)
  async UpdateTag(
    @Args('payload')
    payload: UpdateTagInput,
  ) {
    return await this.tagService.updateTag(payload);
  }

  @Mutation(() => ResponseType)
  @Auth(roles.admin)
  async DeleteTag(@Args('payload') payload: DeleteTagInput) {
    await this.tagService.deleteTag(payload);
    return {
      success: true,
    };
  }
}
