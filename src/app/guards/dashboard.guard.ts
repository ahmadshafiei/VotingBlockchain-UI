import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/common/config.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate, CanActivateChild {

  constructor(
    private configService: ConfigService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.configService.getCurrentPrivateKey())
      return true;

    console.log('access denied');
    this.router.navigate(['login']);

    return false;

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.configService.getCurrentPrivateKey())
      return true;

    console.log('access denied');
    this.router.navigate(['login']);

    return false;

  }

}
