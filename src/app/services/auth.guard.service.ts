import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any{
    let auth:any =  this.authService.isAuthenticated()
    console.log(auth);
      if (auth) {
        return true;
      }else{
        

       
      }
  }

  // canActivateChild(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | UrlTree | Observable<boolean> | Promise<boolean> | boolean {
  //   return this.canActivate(route, state);
  // }
}
