import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { AuthorId as InjectAuthor } from 'src/decorator/author.decorator';
import { Post } from '../post/post.entity';
import { GetPostByIdInput } from '../post/post.input';
import { PostService } from '../post/post.service';
import { BookmarkService } from './bookmark.service';
import { Bookmark } from './entities/bookmark.entity';

@Resolver(() => Bookmark)
export class BookmarkResolver {
  constructor(
    private readonly bookmarkService: BookmarkService,
    private readonly postService: PostService,
  ) {}

  @Mutation(() => Bookmark)
  bookmarkPost(
    @Args('payload') payload: GetPostByIdInput,
    @InjectAuthor() authorID: number,
  ) {
    return this.bookmarkService.bookmarkPost(payload.id, authorID);
  }

  @ResolveField(() => [Post])
  bookmarkedPosts(@Parent() bookmark: Bookmark) {
    return this.postService.getPosts(bookmark.id);
  }

  // todo: better if check method using subscribtion?
  // @Query(() => Bookmark)
  // isPostBookmarked(@Args('payload') payload: IdPostInput) {
  //   return this.bookmarkService.checkIfPostBookmarked(payload.idPost);
  // }
}
