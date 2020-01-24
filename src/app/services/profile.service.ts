import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../../environments/environment';
import { HttpService } from './common/http-service.service';
import { ConfigService } from './common/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  serverUrl = env.environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private httpService: HttpService
  ) { }

  login(privateKey: string, publicKey: string) {
    this.configService.setPrivateKey(privateKey);
    this.configService.setPublicKey(publicKey);
  }

  logout() {
    this.configService.clearConfig();
  }

  getPublicKey(privateKey: string) {
    return this.httpService.get<{ publicKey: string }>('Profile/GetPublicKey', {
      privateKey: privateKey
    }, false, false);
  }

  getNewWallet() {
    return this.httpClient.get<{ publicKey: string, privateKey: string }>(this.serverUrl + '/Profile/GetNewWallet');
  }

}
