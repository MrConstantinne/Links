import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { get } from 'env-var';

config();

export default new DataSource({
  type: 'postgres',
  host: get('POSTGRES_HOST').required().asString(),
  port: get('POSTGRES_PORT').required().asPortNumber(),
  username: get('POSTGRES_USERNAME').required().asString(),
  password: get('POSTGRES_PASSWORD').required().asString(),
  database: get('POSTGRES_DATABASE').required().asString(),
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
});
