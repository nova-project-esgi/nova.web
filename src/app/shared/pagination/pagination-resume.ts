export class PaginationResume<T> {
  values: T[];
  total: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;


  constructor(obj: { values?: T[], total?: number, currentPage?: number, hasNext?: boolean, hasPrevious?: boolean }) {
    this.values = obj?.values ?? [];
    this.total = obj?.total ?? 0;
    this.currentPage = obj?.currentPage ?? 0;
    this.hasNext = obj?.hasNext ?? false;
    this.hasPrevious = obj?.hasPrevious ?? false;
  }


}
