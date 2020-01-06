import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss']
})
export class DashboardIndexComponent implements OnInit {

  constructor(
    private profileService : ProfileService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  logout(){
    this.profileService.logout();
    this.router.navigate(['login']);
  }

}
