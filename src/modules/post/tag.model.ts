import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post_Tag } from './post_tag.model';

@ObjectType({ description: 'Tag model' })
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Post_Tag, (tags) => tags.tag)
  posts: Post_Tag[];
}
