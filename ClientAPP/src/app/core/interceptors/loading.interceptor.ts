import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, delay, finalize, identity } from 'rxjs';
import { BusyService } from '../services/busy.service';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyservice: BusyService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes('emailExists') ||
      (request.method == 'POST' && request.url.includes('orders')) ||
      request.method === 'DELETE'
    ) {
      // return next.handle(request);
      //rxjx operator
      return next.handle(request);
    }

    this.busyservice.busy();
    return next.handle(request).pipe(
      // delay(1000),
      environment.production ? identity : delay(200),
      finalize(() => this.busyservice.idle())
    );
  }
}
