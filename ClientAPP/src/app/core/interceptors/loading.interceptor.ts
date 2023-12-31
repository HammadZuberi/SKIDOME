import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor( private busyservice :BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes('emailExists')){

    // return next.handle(request);
    //rxjx operator
    this.busyservice.busy();
    }
    
    return next.handle(request).pipe(
      // delay(1000),
      delay(200),
      finalize(()=> this.busyservice.idle()));
  }
}
