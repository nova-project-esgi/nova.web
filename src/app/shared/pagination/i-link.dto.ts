import {LinkRelEnum} from '../enums/link-rel.enum';

export interface ILinkDto {
  href: string;
  rel: LinkRelEnum;
  method: string;
}
