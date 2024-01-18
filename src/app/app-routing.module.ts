import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/common/not-found/not-found.component';

import { AuthGuard } from './services/auth.guard.service';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  
  // {path: 'coming-soon', component: ComingSoonComponent},
  // {path: 'blank-page', canActivate: [AuthGuard],component: BlankPageComponent},
  // {path: 'error-500', component: InternalErrorComponent},
  // {path: 'authentication/forgot-password', component: ForgotPasswordComponent},
  // {path: 'authentication/reset-password', component: ResetPasswordComponent},
  // {path: 'authentication/login', component: LoginComponent},
  // {path: 'authentication/register', component: RegisterComponent},
  // {path: 'authentication/signin-signup', component: SigninSignupComponent},
  // {path: 'authentication/logout', component: LogoutComponent},
  // {path: 'authentication/confirm-mail', component: ConfirmMailComponent},
  // {path: 'authentication/lock-screen', component: LockScreenComponent},
  // // {path: 'charts/:id', component: ChartsComponent},
  // {path:':user/:country',canActivate: [AuthGuard],component:AdminComponent},
  // {path:':user/:country/:catagory',canActivate: [AuthGuard],component:AdminComponent},
  // {path:':user/:country/:catagory/:chart',canActivate: [AuthGuard],component:ChartsComponent},
  // {path: 'charts/:id/:country', canActivate: [AuthGuard],component: ChartsComponent},
  // {path: 'admin', canActivate: [AuthGuard],component: AdminComponent},
  // {path: 'admin/:id',canActivate: [AuthGuard], component: AdminComponent},
  // Here add new pages component

  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: '',
    // component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/layouts/auth-layout/auth-layout.module').then((m) => m.AuthLayoutModule)
      }
    ]
  },
  {
    path: '',
    // component: UserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/layouts/user-layout/user-layout.module').then((m) => m.UserLayoutModule),
      }
    ],
    canActivate: [AuthGuard]
  },


  // {
  //   path: '',
  //   loadChildren: () => import('../app/layouts/auth-layout/auth-layout.module').then((m) => m.AuthLayoutModule)
  // },

  { path: '**', component: NotFoundComponent } // This line will remain down from the whole pages component list
];

@NgModule({

  // imports: [
  //   CommonModule,
  //   // BrowserModule,
  //   RouterModule.forRoot(routes, {
  //     // useHash: true
  //   })
  // ],
  // exports: [
  // ],

  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }