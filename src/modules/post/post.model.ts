import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  author: number;

  @Column()
  slug: string;

  @Field(() => Int)
  @Column()
  likes: number;

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
