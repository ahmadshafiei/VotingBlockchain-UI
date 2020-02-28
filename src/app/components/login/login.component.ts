import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showWarning = false;
  walletKeys = { privateKey: '', publicKey: '' };

  privateKey: string;

  signInForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = new FormGroup({
      name: new FormControl(null),
      phoneNumber: new FormControl(null)
    });
  }

  login(privateKey: string) {

    this.profileService.getPublicKey(privateKey).subscribe(w => {
      this.profileService.login(privateKey, w.publicKey);
      this.router.navigateByUrl('/Dashboard/Profile');
    });

  }

  getPrivateKey() {
    const phoneRegex = /^09[0-9]{9}$/;

    if (!phoneRegex.test(this.signInForm.value.phoneNumber)) {
      this.toastr.error('شماره تلفن وارد شده صحیح نمیباشد');
      return;
    }

    if (!this.signInForm.value.name || this.signInForm.value.name.length === 0) {
      this.toastr.error('نام خود را وارد کنید')
      return;
    }

    this.profileService.getNewWallet(this.signInForm.value).subscribe(p => {

      this.walletKeys = p;
      this.showWarning = true;

    });
  }

}
