import { Seeder } from '@jorgebodega/typeorm-seeding';
import type { DataSource } from 'typeorm';
import { Tag } from '../../src/modules/tag/tag.entity';

export class CreateTag extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const tagRepo = dataSource.getRepository(Tag);
    tagRepo.create(
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
  }
}
