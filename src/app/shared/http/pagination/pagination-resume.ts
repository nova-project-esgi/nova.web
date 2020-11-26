import {LinkRelEnum} from '../../enums/link-rel.enum';
import {PaginationMetadata} from './pagination-metadata';

export class PaginationResume {
  hasNext = false;
  hasPrevious = false;
  size = 0;
  page = 0;

  constructor(metadata: PaginationMetadata<any>) {
    this.hasNext = metadata.links.some(l => l.rel === LinkRelEnum.NEXT);
    this.hasPrevious = metadata.links.some(l => l.rel === LinkRelEnum.PREVIOUS);
    try {
      const currentTextUrl = metadata.links.find(l => l.rel === LinkRelEnum.CURRENT)?.href;
      if (currentTextUrl) {
        const currentUrl = new URL(currentTextUrl);
        this.size = Number(currentUrl.searchParams.get('size'));
        this.page = Number(currentUrl.searchParams.get('page'));
      }
    }finally {

    }
  }
}
