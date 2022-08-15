import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Field()
  @Column()
  tags: string[];

  @Field(() => Int)
  @Column()
  likes: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
