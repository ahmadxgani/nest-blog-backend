import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { roles } from '../../interface/role.interface';
import { BookmarkPost } from '../post/bookmark.entity';
import { Post } from '../post/post.entity';

@ObjectType({ description: 'Author model' })
@Entity()
export class Author {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.author, {
    cascade: true,
  })
  posts: Post[];

  @Field(() => [BookmarkPost])
  @OneToMany(() => BookmarkPost, (post) => post.author, {
    cascade: true,
  })
  bookmarks: BookmarkPost[];

  @Field({ nullable: true })
  @Column({ unique: true, nullable: true })
  image?: string;

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

  @Column({ default: roles.member })
  role: roles;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true, type: 'varchar' })
  verifyCode?: string | null;

  @Column({ nullable: true, type: 'varchar' })
  resetPasswordToken?: string | null;

  @Column()
  password: string;
}
