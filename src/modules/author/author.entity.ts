import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { roles } from '../../interface/role.interface';
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

  @Field({ nullable: true })
  @Column({ unique: true, nullable: true })
  image?: string;

  @Field()
  @Column({ default: false })
  verified: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  verifyCode?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  resetPasswordToken?: string | null;
}
