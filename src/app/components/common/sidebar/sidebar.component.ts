import { Component } from '@angular/core';
import { ToggleService } from '../header/toggle.service';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ChartsServiceService } from 'src/app/services/charts-service.service';
import { Route, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    panelOpenState = false;

    isToggled = false;

    user_id :any = "6583e077beb7fcf1f6ef7827"

    catagory_list:any = []

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        public chartsServiceService: ChartsServiceService,
        public router: Router,
        public generalService: GeneralService,

        
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });

        this.get_catagories()
    }

    onCatagory(event:any){
        event.stopPropagation();
        console.log("work");
        this.router.navigate(['/admin'])
        
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




    

    get_catagories(){


        this.chartsServiceService.getCatagory(this.user_id).subscribe({
            next:(data:any)=>{
                console.log(data);

                this.catagory_list = data.data
            },error:(error)=>{
                console.log(error);
            }
        })
    }

}