import { DataSource } from 'typeorm';
const path = require('path');
const envConfig = require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

function env(key: string) {
  return envConfig.parsed[key] || process.env[key];
}

export default new DataSource({
  type: env('DB_DIALECT'),
  host: env('DB_HOST'),
  port: env('DB_PORT'),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_NAME'),
  entities: [__dirname + '/**/*.entity.ts'],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  synchronize: false,
});
