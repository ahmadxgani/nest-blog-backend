import { Post } from './post.model';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Tag } from './tag.model';

@Entity()
export class Post_Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.posts)
  post: Post;

  @ManyToOne(() => Tag, (tag) => tag.posts)
  tag: Tag;
}
