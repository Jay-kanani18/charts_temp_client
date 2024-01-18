import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout.component';

import { LoginComponent } from 'src/app/components/authentication/login/login.component';
import { RegisterComponent } from 'src/app/components/authentication/register/register.component';

const routes: Routes = [
  {
    path: '', 
    children: [
      { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },
      { path: 'auth', component: AuthLayoutComponent },
      // {path: 'authentication/forgot-password', component: ForgotPasswordComponent},
      // {path: 'authentication/reset-password', component: ResetPasswordComponent},
      {path: 'authentication/login', component: LoginComponent},
      {path: 'authentication/register', component: RegisterComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
