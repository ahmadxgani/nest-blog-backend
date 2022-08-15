import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { roles } from 'src/interface/role.interface';
import { Post } from '../post/post.model';

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
  @Column()
  posts: Post[]; // pending: relasi

  @Field()
  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Field()
  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}
