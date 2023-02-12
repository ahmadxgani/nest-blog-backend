import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Author } from '../author/author.entity';
import { Tag } from '../tag/tag.entity';
import { Bookmark } from '../bookmark/entities/bookmark.entity';
import { Like } from '../like/entities/like.entity';

@ObjectType({ description: 'Post model' })
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field()
  @Column()
  content: string;

  @Column({ default: true })
  draft: boolean;

  @Field()
  @Column({ unique: true })
  slug: string;

  @OneToMany(() => Like, (likePosts) => likePosts.post)
  like: Like[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.post)
  bookmark: Bookmark[];

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    cascade: true,
  })
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => Author, (author) => author.posts, {
    onDelete: 'CASCADE',
  })
  author: Author;

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
