import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../../environments/environment';
import { HttpService } from './common/http-service.service';
import { ConfigService } from './common/config.service';
import { User } from '../model/user/user.model';

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

  getNewWallet(userInfo: any) {
    return this.httpService.post<{ publicKey: string, privateKey: string }>('Profile/GetNewWallet', userInfo, true, false);
  }

  isAdmin() {
    return this.httpService.get<boolean>('Profile/IsAdmin', { publicKey: this.configService.getCurrentPublicKey() });
  }

  getUsername() {
    return this.httpService.get<User>('Profile/GetUsername', { publicKey: this.configService.getCurrentPublicKey() });
  }

}
