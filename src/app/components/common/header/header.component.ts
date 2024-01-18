import { Component, HostListener } from '@angular/core';
import { ToggleService } from './toggle.service';
import { DatePipe } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    isSticky: boolean = false;
    selected_country: any = null
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    countries: any = null

    isToggled = false;

    activated_type: any = 0

    url: any = []

    constructor(
        private toggleService: ToggleService,
        private datePipe: DatePipe,
        public themeService: CustomizerSettingsService,
        private http: HttpClient,
        public router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,

        public generalService: GeneralService,


    ) {




        // this.router.events.subscribe(event => {

        //     console.log(event);
        //     if (event instanceof NavigationEnd) {


        //         const params = this.route.snapshot.paramMap;

        //         const allParams:any = {};
        //         params.keys.forEach(key => {
        //           allParams[key] = params.get(key);
        //         });

        //         console.log(allParams);

        //         // this.url = event.url.split("/")

        //         // if (this.url[1] == 'charts') {
        //         //     this.activated_type = 1

        //         // } else {
        //         //     this.activated_type = 2

        //         // }
        //     }
        // });

        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        // this.http.post(`${environment.URL}/get_countries`,{}).subscribe({
        //     next:(data:any)=>{
        //         this.countries = data.countries 
        //         generalService.all_countries = data.countries
        //         generalService.country_detail = data.countries[0]
        //         // this.selected_country = this.countries[1]._id
        //         // this.generalService.selected_country = this.selected_country


        //         // this.generalService.selected_country = this.countries[1]._id
        //         // console.log(generalService.selected_country);



        //     }
        // })
    }
    ngOnInit() {





        setTimeout(() => {
            
            let user: any = localStorage.getItem('user')
            let parsed_user = JSON.parse(user)
            this.generalService.selected_catagory = parsed_user?.catagory_detail[0]
            this.http.post(`${environment.URL}/get_countries`, {}).subscribe({
                next: (data: any) => {
                this.countries = data.countries
                this.generalService.all_countries = data.countries
                this.generalService.country_detail = data.countries[0]
                this.selected_country = this.countries[0]._id
                this.generalService.selected_country = this.selected_country
                const country = this.generalService.all_countries?.filter((each: any) => each._id == this.generalService.selected_country)
                this.generalService.selected_currency = country[0].currency_sign
            }
        })
    }, 500);
        this.route.url.subscribe(urlSegments => {

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
    onSelect(country: any) {

        this.generalService.updateHeaderVariable("aa");


        this.selected_country = country

        localStorage.setItem('country', JSON.stringify(this.selected_country))
        this.generalService.selected_country = this.selected_country._id
        this.generalService.country_detail = this.selected_country

        let user: any = localStorage.getItem('user')
        let parsed_user = JSON.parse(user)
        this.generalService.selected_catagory = parsed_user.catagory_detail[0]


        // this.route.params.subscribe((paramss: any) => {

        //     console.log(paramss);

        //     if(paramss.chart){
        //         console.log("if");
        //         this.activated_type = 1


        //     }else{
        //         console.log('else3');
        //         this.activated_type = 2


        //     }

        // })


        if (this.generalService.activated_type == 2) {

            // /{{user.name}}/{{generalService.country_detail?.country_name}}/{{generalService?.selected_catagory?.name}}/{{subcatagory.name}}
            this.router.navigate([`/${parsed_user.name}`, this.generalService.country_detail?.country_name, this.generalService?.selected_catagory?.name, this.generalService.selected_subcatagory.name])

        } else {

            // this.router.navigate(['/admin',this.selected_country._id]
            this.router.navigate([`/${parsed_user.name}/${this.selected_country.country_name}/${this.generalService.selected_catagory.name}`])

        }


    }

    onLogout(){
        this.authService.logOut()

    }


    currentDate: Date = new Date();
    formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');

}