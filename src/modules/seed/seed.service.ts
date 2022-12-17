import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag/tag.entity';
import { Repository } from 'typeorm';
import { Author } from '../author/author.entity';
import * as bcrypt from 'bcrypt';
import { roles } from '../../interface/role.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Tag)
    private readonly TagModel: Repository<Tag>,
    @InjectRepository(Author)
    private readonly AuthorModel: Repository<Author>,
  ) {}
  async seed() {
    await this.TagModel.insert(
      [
        'javascript',
        'html',
        'css',
        'php',
        'golang',
        'nodejs',
        'rust',
        'kotlin',
        'java',
        'python',
      ].map((tag) => ({ name: tag })),
    );

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('1234', salt);

    await this.AuthorModel.insert([
      {
        username: 'super admin',
        email: 'admin@s.com',
        password,
        role: roles.admin,
        posts: [],
      },
      {
        username: 'shinigami shinoa',
        email: 'shinoa@s.com',
        password,
        role: roles.member,
        posts: [],
      },
      {
        username: 'kuchiki bocchi',
        email: 'bochh@s.com',
        password,
        role: roles.member,
        posts: [],
      },
    ]);
  }
}
