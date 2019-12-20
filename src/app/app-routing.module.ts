import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardIndexComponent } from './components/dashboard/dashboard-index/dashboard-index.component';
import { ProfileIndexComponent } from './components/profile/profile-index/profile-index.component';


const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  {
    path: 'Dashboard', component: DashboardIndexComponent, children: [
      { path: 'Profile', component: ProfileIndexComponent }
    ]
  },
  { path: '**', redirectTo: 'Login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
