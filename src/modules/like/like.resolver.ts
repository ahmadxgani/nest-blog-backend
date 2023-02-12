import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { GetPostByIdInput } from 'src/modules/post/post.input';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { AuthorId as InjectAuthor } from 'src/decorator/author.decorator';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Like)
  likePost(
    @Args('payload') payload: GetPostByIdInput,
    @InjectAuthor() authorID: number,
  ) {
    return this.likeService.likePost(payload.id, authorID);
  }

  // get spesific like from spesific author's post
  // @Query ...
}
