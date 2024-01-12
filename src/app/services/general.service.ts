import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartsServiceService } from './charts-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  selected_country: any = null
  selected_currency: any = null
  all_countries: any = []
  country_detail: any = {}
  selected_catagory: any = {}
  selected_subcatagory: any = {}
  activated_type: any = 1



  private headerVariableSubject: BehaviorSubject<string> = new BehaviorSubject<string>('default-value');

  constructor(private apiService: ChartsServiceService, private http: HttpClient,) { 

    this.getCountries()

  }

  // Observable to subscribe to changes in the header variable
  getHeaderVariableObservable(): Observable<string> {
    return this.headerVariableSubject.asObservable();
  }

  getCountries() {

    return new Promise((res,rej) => {

      this.http.post(`${environment.URL}/get_countries`, {}).subscribe({
        next: (data: any) => {
          res(true)



          this.all_countries = data.countries
          // let country = this.all_countries?.filter((each: any) => each._id == this.selected_country)
          this.country_detail = this.all_countries[0]
          this.selected_country = this.all_countries[0]._id
          this.selected_currency = this.country_detail.currency_sign
          // let z = this.generalService.all_countries.filter((each: any) => each._id == paramss.id)
          localStorage.setItem('country', JSON.stringify(this.country_detail))


        }
      })

    })
  }

  updateHeaderVariable(newValue: string) {
    this.headerVariableSubject.next(newValue);
    this.triggerApiCall(newValue);
  }

  private triggerApiCall(value: string) {
    this.apiService.updateData(true);

  }
}
