import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ElectionIndexComponent } from './components/election/index/index.component';
import { ElectionCreateAndUpdateComponent } from './components/election/createAndUpdate/createAndUpdate.component';
import { VoteComponent } from './components/election/vote/vote.component';
import { CookieService } from 'ngx-cookie-service';
import { MaterialModule } from './material.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardIndexComponent } from './components/dashboard/dashboard-index/dashboard-index.component';
import { ProfileIndexComponent } from './components/profile/profile-index/profile-index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ElectionIndexComponent,
    ElectionCreateAndUpdateComponent,
    VoteComponent,
    DashboardIndexComponent,
    ProfileIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot() 
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }