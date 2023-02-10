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
import { BookmarkPost } from './bookmark.entity';
import { LikePost } from './like.entity';

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

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.posts, {
    onDelete: 'CASCADE',
  })
  author: Author;

  @Column({ default: true })
  draft: boolean;

  @Field(() => [BookmarkPost])
  @OneToMany(() => BookmarkPost, (bookmark) => bookmark.post)
  bookmark: BookmarkPost[];

  @Field()
  @Column({ unique: true })
  slug: string;

  @Field(() => [LikePost])
  @OneToMany(() => LikePost, (likePosts) => likePosts.post)
  like: LikePost[];

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.posts, {
    cascade: true,
  })
  @JoinTable()
  tags: Tag[];

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
