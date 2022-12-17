import { roles } from '../../src/interface/role.interface';
import { Author } from '../../src/modules/author/author.entity';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import type { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateAuthor extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const authorRepo = dataSource.getRepository(Author);
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('1234', salt);

    authorRepo.create([
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
