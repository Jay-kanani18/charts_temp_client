import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToggleService } from 'src/app/components/common/header/toggle.service';
import { CustomizerSettingsService } from 'src/app/components/customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-user-layout',
  // standalone: true,
  // imports: [],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

  isToggled = false;

  constructor(
      public router: Router,
      private toggleService: ToggleService,
      public themeService: CustomizerSettingsService
  ) {
      this.toggleService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }

  toggleRightSidebarTheme() {
      this.themeService.toggleRightSidebarTheme();
  }

  toggleHideSidebarTheme() {
      this.themeService.toggleHideSidebarTheme();
  }

  toggleCardBorderTheme() {
      this.themeService.toggleCardBorderTheme();
  }

  toggleTheme() {
      this.themeService.toggleTheme();
  }

  toggleCardBorderRadiusTheme() {
      this.themeService.toggleCardBorderRadiusTheme();
  }

  toggleRTLEnabledTheme() {
      this.themeService.toggleRTLEnabledTheme();
  }
}
