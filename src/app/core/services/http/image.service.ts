import {Injectable} from '@angular/core';
import {ApiServiceBase} from './api-service.base';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends ApiServiceBase {
  protected url: string;

  constructor(protected http: HttpClient) {
    super();
  }

  getData(url: string): Observable<string> {
    return this.http.get(url, {responseType: 'blob'})
      .pipe(
        switchMap(response => this.readFile(response))
      );
  }

  saveFile(url: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(url, formData);
  }

  private readFile(blob: Blob): Observable<string> {
    return new Observable(obs => {
      const reader = new FileReader();

      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onloadend = () => {
        obs.next(reader.result.toString());
        obs.complete();
      };
      // reader.onloadend = () => obs.complete();

      return reader.readAsDataURL(blob);
    });
  }

}
