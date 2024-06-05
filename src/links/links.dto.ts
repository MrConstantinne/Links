import { IsNotEmpty, IsString } from 'class-validator';

export class LinkDto {
  @IsString()
  @IsNotEmpty()
  data: string;
}
