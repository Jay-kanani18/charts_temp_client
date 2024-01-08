import { Component, HostListener } from '@angular/core';
import { ToggleService } from './toggle.service';
import { DatePipe } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

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
    
    constructor(
        private toggleService: ToggleService,
        private datePipe: DatePipe,
        public themeService: CustomizerSettingsService,
        private http: HttpClient,
        public router: Router,
        public generalService: GeneralService,


    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.http.get(`${environment.URL}/get_countries`).subscribe({
            next:(data:any)=>{
                this.countries = data.countries 
                // this.selected_country = this.countries[1]._id
                // this.generalService.selected_country = this.selected_country

                
                // this.generalService.selected_country = this.countries[1]._id
                // console.log(generalService.selected_country);


          
            }
        })
    }
    // ngOnInit() {
    //     this.http.get(`${environment.URL}/get_countries`).subscribe({
    //         next:(data:any)=>{
    //             this.countries = data.data.countries
    //             console.log("🚀 ~ file: header.component.ts:45 ~ HeaderComponent ~ this.http.get ~  this.countries:",  this.countries)
    //         }
    //     })
    // }
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
    onSelect(event:any){
        this.selected_country = event.value
        this.generalService.selected_country = this.selected_country
        this.router.navigate(['/admin',event.value])


    }
    

    currentDate: Date = new Date();
    formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');

}