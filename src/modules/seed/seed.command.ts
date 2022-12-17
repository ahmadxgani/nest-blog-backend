import { Command, CommandRunner } from 'nest-commander';
import { SeedService } from './seed.service';

@Command({ name: 'seeder', description: 'Generate dummy data' })
export class SeedDataCommand extends CommandRunner {
  constructor(private readonly seedDataService: SeedService) {
    super();
  }

  async run() {
    await this.seedDataService.seed();
  }
}
