import { Field, ObjectType } from '@nestjs/graphql';
import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Author } from '../author/author.entity';
import { Post } from './post.entity';

@ObjectType({ description: 'Like Post Model' })
@Entity()
export class BookmarkPost {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Author)
  author: Author;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  post: Post;

  @Field(() => Boolean)
  @Column({ default: true })
  isBookmarked: boolean;

  @Field()
  bookmarks: number;
}
