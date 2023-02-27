import { roles } from '../../src/interface/role.interface';
import { Author } from '../../src/modules/author/author.entity';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import type { DataSource } from 'typeorm';
import { hashPassword } from '../../src/util/utilities';

export default class CreateAuthor extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const authorRepo = dataSource.getRepository(Author);
    const password = await hashPassword('1234');
    const authors = authorRepo.create([
      {
        name: 'super admin',
        username: 'reyuki',
        email: 'admin@s.com',
        password,
        role: roles.admin,
        posts: [],
        verified: true,
      },
      {
        name: 'shinigami shinoa',
        username: 'shinoa',
        email: 'shinoa@s.com',
        password,
        role: roles.member,
        posts: [],
        verified: true,
      },
      {
        name: 'kuchiki bocchi',
        username: 'rukia',
        email: 'bochh@s.com',
        password,
        role: roles.member,
        posts: [],
        verified: true,
      },
    ]);
    await authorRepo.save(authors);
  }
}
