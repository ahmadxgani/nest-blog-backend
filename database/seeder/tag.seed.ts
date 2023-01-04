import { Seeder } from '@jorgebodega/typeorm-seeding';
import type { DataSource } from 'typeorm';
import { Tag } from '../../src/modules/tag/tag.entity';

export default class CreateTag extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const tagRepo = dataSource.getRepository(Tag);
    const tags = tagRepo.create(
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

    await tagRepo.save(tags);
  }
}
