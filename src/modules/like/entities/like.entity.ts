import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Author } from '../../author/author.entity';
import { Post } from '../../post/post.entity';

@ObjectType({ description: 'Like Post Model' })
@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Author)
  author: Author;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  post: Post;

  @Field(() => Int)
  likes: number;
}
