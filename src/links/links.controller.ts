import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  HttpException,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { LINK_ALREADY_USED } from './links.constant';
import { LinkDto } from './links.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}
  @Post()
  async createLink(@Body() { data }: LinkDto): Promise<string> {
    try {
      return (await this.linksService.create(data)).id;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get(':linkId')
  async getLink(
    @Param('linkId', ParseUUIDPipe) linkId: string,
  ): Promise<string> {
    try {
      const link = await this.linksService.get(linkId);
      if (!link) {
        throw new NotFoundException(LINK_ALREADY_USED);
      }
      return link.data;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
