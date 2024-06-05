import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity } from './link.entity';
import { Repository } from 'typeorm';
import { get } from 'env-var';
import { Links } from './links.interfaces';

@Injectable()
export class LinksService {
  private logger = new Logger(LinksService.name);
  private readonly debug = get('DEBUG').asBool() ?? true;

  constructor(
    @InjectRepository(LinkEntity)
    private readonly linksRepository: Repository<LinkEntity>,
  ) {}

  async create(link: string): Promise<Links> {
    const result = await this.linksRepository.save({
      data: link,
    });

    if (this.debug) this.logger.debug(result);

    return result;
  }

  async get(linkId: string): Promise<Links> {
    const link = await this.linksRepository.findOneBy({
      id: linkId,
      active: true,
    });

    if (link) {
      await this.linksRepository.update({ id: linkId }, { active: false });
      if (this.debug) this.logger.debug(JSON.stringify(link, null, 2));
      return link;
    }
  }
}
