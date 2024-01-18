import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()

export class ResInterceptInterceptor implements HttpInterceptor {

constructor(private toster:ToastrService,private authService:AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

          if(!event.body?.status){
            this.toster.error(event.body.data.msg)

          }

          
          if(event?.body?.code == 401){
            this.authService.logOut()
          }
          console.log(event.status);


          event = event.clone({body:event.body})
          // You can modify the response or perform additional actions here
          // For example, logging, error handling, etc.
        }
      })
    );
  }
}