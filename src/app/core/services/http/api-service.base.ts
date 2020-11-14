import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LinkRelEnum} from '../../../shared/enums/link-rel.enum';
import {KeyValue} from '@angular/common';
import {UrlUtils} from '../../../shared/utils/url.utils';
import {map} from 'rxjs/operators';
import {PaginationMetadata} from '../../../shared/others/pagination-metadata';
import {ObservableObject} from '../../../shared/models/observable-object';

export interface GetParams<T, F = T> {
  url?: string;
  fieldCtr?: any;
  fields?: Array<keyof T>;
  ascOrderColumnsCtr?: any;
  ascOrderColumns?: Array<keyof T>;
  descOrderCtr?: any;
  descOrderColumns?: Array<keyof T>;
  filterObj?: F;
  filters?: KeyValue<string, any> [];
}

export abstract class ApiServiceBase {

  protected abstract url: string;
  protected abstract http: HttpClient;


  protected getPatchableFiltered<T, P = T, F = T>(obj: GetParams<P, F>): Observable<ObservableObject<T>>{
    return this.getFiltered<T, P, F>(obj).pipe(
      map(res => new ObservableObject<T>({object: res}))
    );
  }

  protected fetchAllPatchable<T, P = T, F = T>(obj: GetParams<P, F>, acc: T[] = []): Observable<ObservableObject<T>[]> {
    return this.fetchAll<T, P, F>(obj).pipe(
      map(res =>  res.map(el => new ObservableObject<T>({object: el})))
    );
  }


  // T: return object, P: specified properties to get by model, F: filter type
  protected getFiltered<T, P = T, F = T>(obj: GetParams<P, F>): Observable<T>{
    const url = UrlUtils.convertGetParamsToUrl(obj);
    return this.http.get<T>(url);
  }

  protected getAllFiltered<T, P = T, F = T>(obj: GetParams<P, F>): Observable<T[]>{
    const url = UrlUtils.convertGetParamsToUrl(obj);
    return this.http.get<PaginationMetadata<T>>(url).pipe( map(res => res.values));
  }

  protected fetchAll<T, P = T, F = T>(obj: GetParams<P, F>, acc: T[] = []): Observable<T[]> {
    const url = UrlUtils.convertGetParamsToUrl(obj);
    return new Observable(subscriber => this.http.get<PaginationMetadata<T>>(url).subscribe(value => {
      const nextLink = value.links.find(l => l.rel === LinkRelEnum.NEXT);
      acc.push(...value.values);
      if (nextLink) {
        this.fetchAll({url: nextLink.href}, acc).subscribe(next => subscriber.next(acc));
      } else {
        subscriber.next(acc);
      }
    }));
  }


  protected createAndLocate<T>(url: string, body: T ): Observable<string> {
    return this.http.post(url, body, {observe: 'response'}).pipe(
      map(value => value.headers.get('location'))
    );
  }

  protected createAndGetIds<T>(url: string, body: T ): Observable<number[]>{
    return this.createAndLocate(url, body).pipe(
      map(location => {
        const segments = UrlUtils.convertPathUrlToKeysValues(location);
        return segments.map(kV => kV.value);
      })
    );
  }


}
