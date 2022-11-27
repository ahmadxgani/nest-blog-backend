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
} from 'typeorm';
import { Author } from '../author/author.entity';
import { Tag } from './tag.entity';

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
  content: string;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.posts)
  author: Author;

  @Column({ default: true })
  draft: boolean;

  @Field()
  @Column({ unique: true })
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
