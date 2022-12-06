import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { roles } from 'src/interface/role.interface';
import { Post } from '../post/post.entity';

registerEnumType(roles, { name: 'roles' });

@ObjectType({ description: 'Author model' })
@Entity()
export class Author {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field(() => roles)
  @Column({ default: roles.member })
  role: roles;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.author, {
    eager: true,
    cascade: true,
  })
  posts: Post[];

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
