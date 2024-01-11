import { Component, HostListener } from '@angular/core';
import { ToggleService } from './toggle.service';
import { DatePipe } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Z } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    isSticky: boolean = false;
    selected_country:any = null
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    countries:any = null

    isToggled = false;

    activated_type:any = 0

    url:any = []
    
    constructor(
        private toggleService: ToggleService,
        private datePipe: DatePipe,
        public themeService: CustomizerSettingsService,
        private http: HttpClient,
        public router: Router,
        private route: ActivatedRoute,

        public generalService: GeneralService,


    ) {

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {

               this.url = event.url.split("/")

                if(this.url[1]=='charts'){
                    this.activated_type = 1

                }else{
                    this.activated_type = 2

                }





              // Your function to be executed when navigation ends
              // You can call your functions here
            }
          });
  
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.http.post(`${environment.URL}/get_countries`,{}).subscribe({
            next:(data:any)=>{
                this.countries = data.countries 
                generalService.all_countries = data.countries
                // this.selected_country = this.countries[1]._id
                // this.generalService.selected_country = this.selected_country

                
                // this.generalService.selected_country = this.countries[1]._id
                // console.log(generalService.selected_country);


          
            }
        })
    }
    ngOnInit() {
        this.route.url.subscribe(urlSegments => {

            console.log('wwww');
        })
    //     this.http.post(`${environment.URL}/get_countries`).subscribe({
    //         next:(data:any)=>{
    //             this.countries = data.data.countries
    //             console.log("🚀 ~ file: header.component.ts:45 ~ HeaderComponent ~ this.http.post ~  this.countries:",  this.countries)
    //         }
    //     })
    }
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggle() {
        this.toggleService.toggle();
    }

    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
    onSelect(country:any){

        this.selected_country =country
        this.generalService.selected_country = this.selected_country._id
        this.generalService.country_detail = this.selected_country
        if(this.activated_type== 1){
             this.router.navigate(['/charts',this.url[2],this.selected_country._id])
        }else{

            this.router.navigate(['/admin',this.selected_country._id])
        }


    }
    

    currentDate: Date = new Date();
    formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');

}