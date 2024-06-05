import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { get } from 'env-var';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from 'dotenv';

config();

export const TypeormConfig: TypeOrmModuleOptions & PostgresConnectionOptions = {
  type: 'postgres',
  host: get('POSTGRES_HOST').required().asString(),
  port: get('POSTGRES_PORT').required().asPortNumber(),
  username: get('POSTGRES_USERNAME').required().asString(),
  password: get('POSTGRES_PASSWORD').required().asString(),
  database: get('POSTGRES_DATABASE').required().asString(),
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  autoLoadEntities: true,
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
};
