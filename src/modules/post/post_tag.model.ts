import { Post } from './post.model';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Tag } from './tag.model';

@Entity()
export class Post_Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Post, (pivot) => pivot.id)
  post_id: Post[];

  @OneToMany(() => Tag, (pivot) => pivot.id)
  tag_id: Tag[];
}
