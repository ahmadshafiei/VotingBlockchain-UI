import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  serverUrl = env.environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  login(privateKey: string) {
    this.cookieService.set('privateKey', privateKey);
  }

  logout() {
    this.cookieService.deleteAll();
  }

  getNewWallet() {

    return this.httpClient.get<{ publicKey: string, privateKey: string }>(this.serverUrl + '/Profile/GetNewWallet');

  }

}
