import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardIndexComponent } from './components/dashboard/dashboard-index/dashboard-index.component';
import { ProfileIndexComponent } from './components/profile/profile-index/profile-index.component';
import { ElectionIndexComponent } from './components/election/index/index.component';
import { DashboardGuard } from './guards/dashboard.guard';
import { ElectionCreateAndUpdateComponent } from './components/election/createAndUpdate/createAndUpdate.component';
import { VoteComponent } from './components/vote/vote.component';
import { SettingComponent } from './components/setting/setting.component';


const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  {
    path: 'Dashboard', component: DashboardIndexComponent, canActivate: [DashboardGuard], canActivateChild: [DashboardGuard], children: [
      { path: 'Setting', component: SettingComponent },
      { path: 'Profile', component: ProfileIndexComponent },
      { path: 'Vote', component: VoteComponent },
      { path: 'Elections', component: ElectionIndexComponent },
      { path: 'Election', component: ElectionCreateAndUpdateComponent }
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
