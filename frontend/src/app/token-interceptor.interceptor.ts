import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loadingService.showLoading();

    const token = localStorage.getItem("token");
    let requestCloned = request
    if(token){
      requestCloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
      });
    }

    return next.handle(requestCloned).pipe(
      finalize(() => {
        this.loadingService.hideLoading()
      })
    );
  }
}
