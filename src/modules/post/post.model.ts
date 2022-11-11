import { Field, Int, ObjectType } from '@nestjs/graphql';
import { content } from 'src/interface/content.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Author } from '../author/author.model';
import { Tag } from './tag.model';

@ObjectType({ description: 'Post model' })
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field()
  @Column()
  content: content;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.posts)
  author: Author;

  @Column({ default: true })
  draft: boolean;

  @Column()
  slug: string;

  @Field(() => Int)
  @Column()
  likes: number;

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
