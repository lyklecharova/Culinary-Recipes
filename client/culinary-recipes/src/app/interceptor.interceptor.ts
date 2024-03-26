import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Извличане на токена за автентикация от localStorage
    let localToken = localStorage.getItem('token');
    if (localToken) {
      // Модифициране на заявката за добавяне на токена за автентикация към хедърите
      request = request.clone({
        headers: request.headers.set('Authorization', localToken),
      });
    }
    // Изпращане на модифицираната заявка към следващия интерцептор или към HTTP обработчика
    return next.handle(request);
  }
}
