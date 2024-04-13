import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log('HTTP request successful:', request.url, event);
          }
        },
        error => {
          console.error('HTTP request error:', request.url, error);
        }
      )
    );
  }
}
