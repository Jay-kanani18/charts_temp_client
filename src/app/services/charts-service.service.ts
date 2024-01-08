import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChartsServiceService {

  constructor(private http: HttpClient) { }



  getChartslist(from_date:any,to_date:any,user_id:any,chart_id:any) {
    let params = new HttpParams()
     .set("from_date",from_date)
     .set("to_date",to_date)
     .set("user_id",user_id)
     .set("chart_id",chart_id)
     .set("token",'wef')

     let options = {params}
    return this.http.get(

      `${environment.URL}/get_charts_list`,options
    );
  }

  getCharts(id:any){
    return this.http.get(
      `${environment.URL}/get_charts?token=wef&id=${id}`

    );

  }

  getCatagory(id:any){

    return this.http.get(
      `${environment.URL}/get_for_whom?token=wef&id=${id}`
    );


  }

}
