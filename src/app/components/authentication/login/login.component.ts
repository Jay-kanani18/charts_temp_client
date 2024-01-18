import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    hide = true;
    loginForm: any;


    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private authService: AuthService
    ) {}

    ngOnInit() {
    this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
    }


    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
    onLogin(){
        if (this.loginForm.valid) {
            const email = this.loginForm.get('email').value;
            const password = this.loginForm.get('password').value;


            console.log(this.loginForm.value);



            this.authService.login(this.loginForm.value)

            
      
            console.log('Email:', email);
            console.log('Password:', password);
          }
        

    }

}