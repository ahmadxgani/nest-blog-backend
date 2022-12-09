import { roles } from '../../interface/role.interface';
import { Author } from './author.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';

export class CreateAuthor implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('1234', salt);

    await factory(Author)().create({
      username: 'super admin',
      email: 'admin@s.com',
      password,
      role: roles.admin,
      posts: [],
    });
    await factory(Author)().create({
      username: 'shinigami shinoa',
      email: 'shinoa@s.com',
      password,
      role: roles.member,
      posts: [],
    });
    await factory(Author)().create({
      username: 'kuchiki bocchi',
      email: 'bochh@s.com',
      password,
      role: roles.member,
      posts: [],
    });
  }
}
