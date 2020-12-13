import {LinkRelEnum} from '../../enums/link-rel.enum';
import {PaginationMetadata} from './pagination-metadata';
import * as _ from 'lodash';

export interface IPageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

export class PaginationResume {
  size = null;
  page = null;
  total = null;


  constructor(pagination?: Partial<PaginationResume>) {
    _.assign(this, pagination);
  }

  public static fromPaginationMetadata(metadata: PaginationMetadata<any>): PaginationResume {
    const resume: PaginationResume = new PaginationResume();
    resume.total = metadata.total;
    try {
      const currentTextUrl = metadata.links.find(l => l.rel === LinkRelEnum.CURRENT)?.href;

      if (currentTextUrl) {
        const currentUrl = new URL(currentTextUrl);
        resume.size = Number(currentUrl.searchParams.get('size'));
        resume.page = Number(currentUrl.searchParams.get('page'));
      }
    } finally {
    }
    return resume;
  }

  public static fromPageEvent(pageEvent: IPageEvent): PaginationResume {
    return new PaginationResume({page: pageEvent.pageIndex, size: pageEvent.pageSize, total: pageEvent.length});
  }

  get hasNext(): boolean {
    return (this.page + 1) * this.size < this.total;
  }

  get hasPrevious(): boolean {
    return this.page > 0;
  }
}
