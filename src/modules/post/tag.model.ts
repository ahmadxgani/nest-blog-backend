import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './post.model';

@ObjectType({ description: 'Tag model' })
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany((_type) => Post, (post) => post.tags, {
    onDelete: 'CASCADE',
  })
  posts: Post[];
}
