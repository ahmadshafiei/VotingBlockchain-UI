import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  currentPort = window.location.port;

  constructor(
    private cookieService: CookieService
  ) { }

  getCurrentPrivateKey() {
    return this.cookieService.get('privateKey_' + this.currentPort);
  }

  getCurrentPublicKey() {
    return this.cookieService.get('publicKey_' + this.currentPort);
  }

  setPrivateKey(privateKey: string) {
    this.cookieService.set('privateKey_' + this.currentPort, privateKey);
  }

  setPublicKey(publicKey: string) {
    this.cookieService.set('publicKey_' + this.currentPort, publicKey);
  }

  getApiPort() {
    return this.cookieService.get('API_PORT_' + this.currentPort);
  }

  setApiPort(port) {
    this.cookieService.set('API_PORT_' + this.currentPort, port);
  }

  clearConfig() {
    const currentDomainCookies = Object.keys(this.cookieService.getAll()).filter(k => k.includes(this.currentPort));
    currentDomainCookies.forEach(k => this.cookieService.delete(k));
  }

}

