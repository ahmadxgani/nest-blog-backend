import { roles } from '../../src/interface/role.interface';
import { Author } from '../../src/modules/author/author.entity';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import type { DataSource } from 'typeorm';
import { hashPassword } from 'src/util/utilities';

export class CreateAuthor extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const authorRepo = dataSource.getRepository(Author);
    const password = await hashPassword('1234');

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
