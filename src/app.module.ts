import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './configs/typeorm.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptors/response.interceptor';

@Module({
  imports: [LinksModule, TypeOrmModule.forRoot(TypeormConfig)],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
