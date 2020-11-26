// import {Observable, of, Subject} from 'rxjs';
// import {UrlUtils} from '../../utils/url.utils';
// import {HttpClient} from '@angular/common/http';
// import {LinkRelEnum} from '../../enums/link-rel.enum';
// import {KeyValue} from '@angular/common';
// import {map, tap} from 'rxjs/operators';
// import {PaginationMetadata} from './pagination-metadata';
// import {GetParams} from '../requests/get.params';
//
// export class CursorPagination<T> {
//
//   total: number;
//   hasNext = false;
//   hasPrevious = false;
//   valuesSubject = new Subject<T[]>();
//   pageSubject = new Subject<PaginationResume<T>>();
//   baseUrl: string;
//   parsingFunction: (values: any[]) => T[];
//   lastPage: PaginationResume<T>;
//   protected hasStart = false;
//
//   constructor(public url: string, protected httpClient: HttpClient, public page?: number, public size?: number, public limit?: number) {
//     this.baseUrl = url;
//   }
//
//   get displayPage(): number {
//     return this.page + 1;
//   }
//
//   refreshPage(): Observable<PaginationResume<T>> {
//     return this.sendPageRequest();
//   }
//
//   nextValues(): Observable<T[]> {
//     if (this.incrPage()) {
//       return this.sendValuesRequest();
//     }
//     return of(this.lastPage?.values ?? []);
//   }
//
//   previousValues(): Observable<T[]> {
//     this.decrPage();
//     return this.sendValuesRequest();
//   }
//
//   nextPage(withObservable: boolean = false): Observable<PaginationResume<T>> {
//     if (this.incrPage()) {
//       return this.sendPageRequest();
//     }
//     return of(this.lastPage);
//   }
//
//   previousPage(): Observable<PaginationResume<T>> {
//     this.decrPage();
//     return this.sendPageRequest();
//   }
//
//   toPage(page: number): Observable<PaginationResume<T>> {
//     this.setPage(page);
//     return this.sendPageRequest();
//   }
//
//   toValues(page: number): Observable<T[]> {
//     if (this.setPage(page)) {
//       return this.sendValuesRequest();
//     }
//     return of(this.lastPage.values);
//   }
//
//   incrPage(): boolean {
//     if (this.hasStart && this.hasNext === true && this.isInLimit(this.page + 1)) {
//       this.page++;
//       return true;
//     }
//     return false;
//   }
//
//   decrPage(): void {
//     if (this.hasStart && this.hasPrevious === true) {
//       this.page--;
//     }
//   }
//
//   resetPage(): void {
//     this.page = 0;
//   }
//
//   resetUrl(): void {
//     this.url = this.baseUrl;
//   }
//
//   setParams<F>(getParams: GetParams<F>): CursorPagination<T> {
//     getParams.url = this.url;
//     this.url = UrlUtils.convertGetParamsToUrl(getParams);
//     return this;
//   }
//
//   protected sendValuesRequest(): Observable<T[]> {
//     const url = this.getUrl();
//     return this.httpClient.get<PaginationMetadata<T>>(url).pipe(
//       tap(p => {
//         this.setNearPagesIndicators(p);
//         this.total = p.total;
//         this.hasStart = true;
//         if (this.parsingFunction) {
//           p.values = this.parsingFunction(p.values);
//         }
//         this.valuesSubject.next(p.values);
//       }),
//       map(p => {
//         this.lastPage = this.getSummarizePagination(p.values);
//         return p.values;
//       }),
//     );
//   }
//
//   protected sendPageRequest(): Observable<PaginationResume<T>> {
//     return this.sendValuesRequest().pipe(
//       map(values => {
//         this.lastPage = this.getSummarizePagination(values);
//         return this.lastPage;
//       }),
//       tap(page => this.pageSubject.next(page))
//     );
//   }
//
//   protected setNearPagesIndicators(meta: PaginationMetadata<T>): void {
//     this.hasNext = meta.links.some(l => l.rel === LinkRelEnum.NEXT);
//     this.hasPrevious = meta.links.some(l => l.rel === LinkRelEnum.PREVIOUS);
//   }
//
//   protected getUrl(): string {
//     const params: KeyValue<string, number>[] = [];
//     if (this.page !== undefined) {
//       params.push({key: 'page', value: this.page});
//     }
//     if (this.size !== undefined) {
//       params.push({key: 'size', value: this.size});
//     }
//     return UrlUtils.getUrlWithQueries(this.url, ...params);
//   }
//
//   protected setPage(page: number): boolean {
//     if (page * this.size <= this.total && this.isInLimit(page)) {
//       this.page = page;
//       return true;
//     }
//     return false;
//   }
//
//   private isInLimit(page: number): boolean {
//     return !this.limit || this.limit && page < this.limit;
//   }
//
//   private getSummarizePagination(values: T[]): PaginationResume<T> {
//     return {currentPage: this.page, hasNext: this.hasNext, hasPrevious: this.hasPrevious, total: this.total, values};
//   }
// }
