import { Provider } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<Connection> =>
      await createConnection({
        type: process.env['DB_DIALECT'] as 'postgres',
        host: process.env['DB_HOST'],
        port: process.env['DB_PORT'] as any,
        username: process.env['DB_USERNAME'],
        password: process.env['DB_PASSWORD'],
        database: process.env['DB_NAME'],
        entities: [__dirname + '/**/*.entity.ts'],
        logger: 'advanced-console',
        logging: ['warn', 'error'],
        synchronize: false,
      }),
  },
];
