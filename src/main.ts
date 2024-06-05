import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { get } from 'env-var';
import { config } from 'dotenv';

config();
async function bootstrap() {
  const port = get('SERVER_PORT').asPortNumber();
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
