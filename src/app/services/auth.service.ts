import { Injectable } from '@angular/core';
import {
  HttpHeaders,

} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
// import { AES } from "crypto-js";
// import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Token: any = false;
  encryptionKey: any;

  constructor(
    private http: HttpClient,
    public router: Router,
    private cookieService: CookieService,



  ) { }



  login(data: any) {
    this.http.post(
      `${environment.URL}/login`, data
    ).subscribe({
      next: (data: any) => {
        if (data.status) {
          // this.toster.success(data.msg)
          this.router.navigate(["/admin"]);
          localStorage.setItem("user", JSON.stringify(data.data.user));

          // this.userData = data.user._id
        }
        console.log(data);
      }, error: (error) => {
        console.log(error);
      }
    })

  }
  logOut() {
    this.Token = null;

    // const token = localStorage.getItem("newToken");
    const user = localStorage.getItem("user");

    // const dtoken = localStorage.removeItem("newToken");
    const duser = localStorage.removeItem("user");
    const cuser = localStorage.removeItem("country");

    this.router.navigate(["/authentication/login"]);
    // this.http.post(`${environment.URL}/logout`, {  user }).subscribe({
    //   next: (data: any) => {
    //     console.log(data);
    //     // this.toster.success(data.msg)
    //     // localStorage.setItem("newToken", '');
    //     localStorage.setItem("user", '');
    //     // this.userData =''
    //   }, error: (error) => {
    //     console.log(error);
    //     // this.toster.error(error.error.msg)
    //   }
    // });

  }

  // autoLogout() {
  //   let encryptedData = this.cookieService.get("myEncryptedData");
  //   if (encryptedData) {
  //     const decryptedData = AES.decrypt(
  //       encryptedData,
  //       this.encryptionKey
  //     ).toString(CryptoJS.enc.Utf8);

  //     if ((new Date().getTime() - +decryptedData) / 1000 > 10 * 60) {
  //       console.log("time to log out");

  //       this.logOut();
  //     }
  //   }
  //   const data = new Date().getTime().toString();
  //   encryptedData = AES.encrypt(data, this.encryptionKey).toString();
  //   this.cookieService.set("myEncryptedData", encryptedData);
  // }

   isAuthenticated() {
    // const promise = new Promise((resolve, reject) => {
    const raw: any = localStorage.getItem("user");
    const parsed = JSON.parse(raw)
    console.log('authguard');
    if (!parsed?.token || !parsed) {
      // resolve(false)
      this.router.navigate(["/authentication/login"])

      return false

    }
    return true;
    // });
    // return promise;
  }





}
