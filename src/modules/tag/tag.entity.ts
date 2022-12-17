import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../post/post.entity';

@ObjectType({ description: 'Tag model' })
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  name: string;

  @Field(() => [Post])
  @ManyToMany((_type) => Post, (post) => post.tags, {
    onDelete: 'CASCADE',
  })
  posts: Post[];
}
