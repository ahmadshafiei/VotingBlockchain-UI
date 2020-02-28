import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss']
})

export class DashboardIndexComponent implements OnInit {

  isAdmin = false;
  username = null;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkAdmin();
    this.getUsername();
  }

  checkAdmin() {
    this.profileService.isAdmin().subscribe(i => {
      this.isAdmin = i;
    });
  }

  getUsername() {
    this.profileService.getUsername().subscribe(u => {
      console.log(u);
      this.username = u.name;
      console.log(this.username);
    });
  }

  logout() {
    this.profileService.logout();
    this.router.navigate(['login']);
  }

}
