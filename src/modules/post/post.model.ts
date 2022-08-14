import { Field, Int, ObjectType } from '@nestjs/graphql';
import { tags } from 'src/interface/tags.interface';
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

  @Field(() => [tags], { defaultValue: [tags['no_category']] })
  @Column()
  tags: tags[];

  @Field(() => Int)
  @Column()
  likes: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
