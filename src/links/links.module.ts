import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from './link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity])],
  providers: [LinksService],
  controllers: [LinksController],
})
export class LinksModule {}
