import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ReqInterceptInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user: any = localStorage.getItem('user')
    let parsed = JSON.parse(user)
    let token = parsed?.token || ''

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });



    return next.handle(authReq);
  }
}
