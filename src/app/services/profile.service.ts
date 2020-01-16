import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from './common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  serverUrl = env.environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private httpService: HttpService
  ) { }

  login(privateKey: string, publicKey: string) {
    this.cookieService.set('privateKey', privateKey);
    this.cookieService.set('publicKey', publicKey);
  }

  logout() {
    this.cookieService.deleteAll();
  }

  getPublicKey(privateKey: string) {
    return this.httpService.get<{ publicKey: string }>('Profile/GetPublicKey', {
      privateKey: privateKey
    });
  }

  getNewWallet() {
    return this.httpClient.get<{ publicKey: string, privateKey: string }>(this.serverUrl + '/Profile/GetNewWallet');
  }

}
