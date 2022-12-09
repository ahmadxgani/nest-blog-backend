const path = require('path')
const envConfig = require('dotenv').config({
  path: path.resolve(__dirname, ".env"),
})

function env(key) {
  return envConfig.parsed[key] || process.env[key]
}

const baseConfig = {
  type: env('DB_DIALECT'),
  database: env('DB_NAME'),
  entities: [path.resolve(__dirname, 'src/modules/**/*.entity{.ts,.js}')],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  seeds: ["src/modules/**/*.seed{.ts,.js}"],
  factories: ["src/modules/**/*.factory{.ts,.js}"],
}

if (process.env.NODE_ENV !== 'test') {
  module.exports = {
    host: env('DB_HOST'),
    port: env('DB_PORT'),
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    synchronize: false,
    ...baseConfig,
  }
} else {
  module.exports = {
    dropSchema: true,
    synchronize: true,
    ...baseConfig,
  }
}