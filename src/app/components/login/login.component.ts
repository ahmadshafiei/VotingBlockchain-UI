import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showWarning = false;
  walletKeys = { privateKey: '', publicKey: '' };

  privateKey: string;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(privateKey: string) {
    this.profileService.login(privateKey);
    this.router.navigateByUrl('/Dashboard/Profile');
  }

  getPrivateKey() {
    this.profileService.getNewWallet().subscribe(p => {

      this.walletKeys = p;
      this.showWarning = true;

    });
  }

}
