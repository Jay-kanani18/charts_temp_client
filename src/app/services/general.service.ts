import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartsServiceService } from './charts-service.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  selected_country:any = null
  selected_currency:any = null
  all_countries :any=[]
  country_detail:any = {}

  

  private headerVariableSubject: BehaviorSubject<string> = new BehaviorSubject<string>('default-value');

  constructor(private apiService: ChartsServiceService) {}

  // Observable to subscribe to changes in the header variable
  getHeaderVariableObservable(): Observable<string> {
    return this.headerVariableSubject.asObservable();
  }

  updateHeaderVariable(newValue: string) {
    this.headerVariableSubject.next(newValue);
    this.triggerApiCall(newValue);
  }

  private triggerApiCall(value: string) {
    this.apiService.updateData(true);
 
  }
}
