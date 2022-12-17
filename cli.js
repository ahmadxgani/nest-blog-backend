const { CommandFactory } = require("nest-commander");
const { SeedModule } = require('./src/modules/seed/seed.module.ts');
// import { CommandFactory } from 'nest-commander';
// import { SeedModule } from './src/modules/seed/seed.module';

async function bootstrap() {
  await CommandFactory.run(SeedModule, {
    logger: ['error', 'warn', 'debug', 'verbose', 'log'],
  });
}
bootstrap();
