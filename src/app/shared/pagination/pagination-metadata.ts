import {ILinkDto} from './i-link.dto';

export class PaginationMetadata<T> {
  public values: Array<T>;
  public links: ILinkDto[] = [];
  public total: number;

  constructor(pagedList: Array<T>, links: ILinkDto[], total: number) {
    this.values = pagedList;
    this.links = links;
    this.total = total;
  }
}
