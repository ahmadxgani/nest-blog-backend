import { Factory, Seeder } from 'typeorm-seeding';
import { Tag } from './tag.entity';

const tags = [
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
];

export class CreateTag implements Seeder {
  public async run(factory: Factory): Promise<void> {
    tags.forEach(async (name) => {
      await factory(Tag)().create({
        name,
      });
    });
  }
}
