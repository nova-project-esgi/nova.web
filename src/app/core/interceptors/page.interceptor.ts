import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {isOfTypeByKeys} from '../../shared/type-guards/generic-guards';
import {PaginationMetadata} from '../../shared/http/pagination/pagination-metadata';

// @Injectable()
// export class PageInterceptor implements HttpInterceptor {
//
//   public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       tap((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse) {
//           event.body = this.convertToPage(event.body);
//           event.body
//         }
//       }, (err: any) => {
//         if (err instanceof HttpErrorResponse) {
//           if (err.status === 401) {
//           }
//         }
//       }),
//     );
//   }
//
//   private convertToPage(body: any): PaginationMetadata<any> | any {
//     if (isOfTypeByKeys<PaginationMetadata<any>>(body, 'copyTo', 'links', 'total', 'values')) {
//       return new PaginationMetadata(body.values, body.links, body.total);
//     }
//     return body;
//   }
//
// }
