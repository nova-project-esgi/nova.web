import {ILinkDto} from './i-link.dto';
import {LinkRelEnum} from '../../enums/link-rel.enum';

export class PaginationMetadata<T> {

  constructor(pagedList: Array<T>, links: ILinkDto[], total: number) {
    this.values = pagedList;
    this.links = links;
    this.total = total;
  }
  public values: Array<T>;
  public links: ILinkDto[] = [];
  public total: number;

  static fromPage(page: PaginationMetadata<any>): PaginationMetadata<any>{
    return new PaginationMetadata<any>(page?.values, page?.links, page?.total);
  }

  copyTo<New>(values: Array<New>): PaginationMetadata<New>{
    return new PaginationMetadata<New>(values, this.links, this.total);
  }
}



