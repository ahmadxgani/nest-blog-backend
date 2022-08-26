import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tag } from './tags.model';

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

  @Field()
  @Column()
  slug: string;

  @Field(() => [String])
  @OneToMany((type) => Tag, (tag) => tag.post)
  tags: Tag[];

  @Column()
  author: number;

  @Field(() => Int)
  @Column()
  likes: number;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
