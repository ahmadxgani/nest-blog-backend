import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/modules/post/post.entity';

@Injectable()
export class IsOwnedPost implements CanActivate {
  constructor(@InjectRepository(Post) private PostModel: Repository<Post>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    return !!(
      await this.PostModel.find({
        where: {
          id: req.body.variables.id,
          author: {
            id: req.author.id,
          },
        },
      })
    ).length;
  }
}
