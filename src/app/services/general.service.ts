import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  selected_country:any = null
  selected_currency:any = null
  all_countries :any=[]
  country_detail:any = {}

  constructor() { 

  }
}
