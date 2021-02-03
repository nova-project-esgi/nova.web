import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LinkRelEnum} from '../../../shared/enums/link-rel.enum';
import {UrlUtils} from '../../../shared/utils/url.utils';
import {map, switchMap} from 'rxjs/operators';
import {PaginationMetadata} from '../../../shared/http/pagination/pagination-metadata';
import {ObservableObject} from '../../../shared/models/observable-object';
import {HeadersEnum} from '../../../shared/enums/headers.enum';
import {GetParams} from '../../../shared/http/requests/get.params';
import {RequestParams} from '../../../shared/http/requests/request.params';

export abstract class ApiServiceBase {

  protected abstract url: string;
  protected abstract http: HttpClient;

  protected getFormattedUrl(textUrl: string): string{
    try{
      const url = new URL(textUrl);
      url.protocol = window.location.protocol;
      return url.toString();
    }
    catch (e: any){
      return textUrl;
    }
  }

  protected getAcceptHeader(contentType: string): HttpHeaders {
    return new HttpHeaders({[HeadersEnum.ACCEPT]: contentType});
  }

  protected getContentTypeHeader(contentType: string): HttpHeaders {
    return new HttpHeaders({[HeadersEnum.CONTENT_TYPE]: contentType});
  }

  protected getPatchableFiltered<T, F = T, P = T>(obj: GetParams<P, F>): Observable<ObservableObject<T>> {
    return this.getFiltered<T, F, P>(obj).pipe(
      map(res => new ObservableObject<T>({object: res}))
    );
  }

  protected fetchAllPatchable<T, P = T, F = T>(obj: GetParams<P, F>, acc: T[] = []): Observable<ObservableObject<T>[]> {
    return this.fetchAll<T, P, F>(obj).pipe(
      map(res => res.map(el => new ObservableObject<T>({object: el})))
    );
  }


  // T: return object, P: specified properties to get by model, F: filter type
  protected getFiltered<Output, Filter = Output,  P = Output>(obj: GetParams<P, Filter>): Observable<Output> {
    const url = UrlUtils.convertGetParamsToUrl(obj);
    return this.http.get<Output>(this.getFormattedUrl(url), {headers: obj.headers});
  }

  protected getAllFiltered<T, P = T, F = T>(obj: GetParams<P, F>): Observable<T[]> {
    const url = UrlUtils.convertGetParamsToUrl(obj);
    return this.http.get<PaginationMetadata<T>>(this.getFormattedUrl(url), {headers: obj.headers}).pipe(map(res => res.values));
  }

  protected fetchAll<T, P = T, F = T>(obj: GetParams<P, F>, acc: T[] = []): Observable<T[]> {
    const url = UrlUtils.convertGetParamsToUrl(obj);
    return new Observable(subscriber => this.http.get<PaginationMetadata<T>>(this.getFormattedUrl(url), {headers: obj.headers}).subscribe(value => {
      const nextLink = value.links.find(l => l.rel === LinkRelEnum.NEXT);
      acc.push(...value.values);
      if (nextLink) {
        this.fetchAll({url: this.getFormattedUrl(nextLink.href)}, acc).subscribe(next => subscriber.next(acc));
      } else {
        subscriber.next(acc);
      }
    }));
  }


  protected createAndLocate<T>(request: RequestParams, body: T): Observable<string> {
    return this.http.post(this.getFormattedUrl(request.url), body, {observe: 'response', headers: request.headers}).pipe(
      map((value: HttpResponse<any>) => this.getFormattedUrl(value.headers.get('location')))
    );
  }

  protected createAndGet<T, R>(request: RequestParams, body: T): Observable<R> {
    return this.createAndLocate(request, body).pipe(switchMap(location => this.http.get<R>(this.getFormattedUrl(location))));
  }

  protected createAndGetIds<T>(request: RequestParams, body: T): Observable<number[]> {
    return this.createAndLocate(request, body).pipe(
      map(location => {
        const segments = UrlUtils.convertPathUrlToKeysValues(location);
        return segments.map(kV => kV.value);
      })
    );
  }


}
