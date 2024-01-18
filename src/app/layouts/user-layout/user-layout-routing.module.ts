import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';
import { AdminComponent } from 'src/app/components/dashboard/admin/admin.component';
import { ChartsComponent } from 'src/app/components/charts/charts.component';

const routes: Routes = [
  {
    path: '', component: UserLayoutComponent,
    children: [
      { path: '', redirectTo:'admin', pathMatch: 'full' },
      // { path: 'admin', component: AdminComponent },
      { path: ':user/:country', component: AdminComponent },
      { path: ':user/:country/:catagory', component: AdminComponent },
      { path: ':user/:country/:catagory/:chart', component: ChartsComponent },
      { path: 'charts/:id/:country', component: ChartsComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'admin/:id', component: AdminComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
