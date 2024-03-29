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

    user_id: any = "659fac2e37e9286a306d0ba6"

    user: any = ''

    catagory_list: any = []

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

    onCatagory(event: any) {
        event.stopPropagation();
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






    get_catagories() {

        const raw: any = localStorage.getItem("user");
        const parsed = JSON.parse(raw)
        this.user_id = parsed?._id || ''
        let token = parsed?.token || ''

        this.chartsServiceService.getCatagory(this.user_id,token).subscribe({
            next: (data: any) => {

                this.catagory_list = data.data

                this.user = data.user_detail
                localStorage.setItem('user', JSON.stringify(data.user_detail));


            }, error: (error) => {
            }
        })
    }

}