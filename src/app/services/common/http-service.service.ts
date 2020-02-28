import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ConfigService } from './config.service';
import { BlockUI, BlockUIService, NgBlockUI } from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  @BlockUI() blockUI: NgBlockUI;
  baseUrl = 'http://localhost:5000/api/';

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.setApiPort();
  }

  setApiPort() {
    const port = this.configService.getApiPort();
    if (port)
      this.baseUrl = 'http://localhost:' + port + '/api/';
  }

  get<TResponse>(url: string, params: {} = {}, showMessage = false, checkKeys = true): Observable<TResponse> {

    this.setApiPort();
    this.blockUI.start(' ');

    return this.httpClient.get<TResponse>(this.baseUrl + url, {
      headers: this.getHttpHeader(checkKeys),
      params: params,
    }).pipe<TResponse, TResponse>(

      map((data: TResponse) => {

        this.blockUI.stop();

        if (showMessage)
          this.toastr.success('درخواست با موفقیت انجام شد');

        return data;

      }), catchError<any, any>(e => this.handleError(e, showMessage))

    );

  }

  post<TResponse>(url: string, body: {} = {}, showMessage = false, applyAuthentication = true): Observable<TResponse> {

    this.setApiPort();
    this.blockUI.start(' ');

    let headers = {};
    if (applyAuthentication)
      headers = this.getHttpHeader();

    return this.httpClient.post<TResponse>(this.baseUrl + url, body, {
      headers: headers
    }).pipe<TResponse, TResponse>(

      map((data: TResponse) => {

        this.blockUI.stop();

        if (showMessage)
          this.toastr.success('درخواست با موفقیت انجام شد');

        return data;

      }), catchError<any, any>(e => this.handleError(e, showMessage))
    );

  }

  patch<TResponse>(url: string, body: {} = {}, showMessage = false) {

    this.setApiPort();
    this.blockUI.start(' ');

    return this.httpClient.patch<TResponse>(this.baseUrl + url, body, {
      headers: this.getHttpHeader()
    }).pipe<TResponse, TResponse>(

      map((data: TResponse) => {

        this.blockUI.stop();

        if (showMessage)
          this.toastr.success('درخواست با موفقیت انجام شد');

        return data;

      }), catchError<any, any>(e => this.handleError(e, showMessage))
    );

  }

  delete<TResponse>(url: string, params: {} = {}, showMessage = false) {

    this.setApiPort();
    this.blockUI.start(' ');

    return this.httpClient.delete<TResponse>(this.baseUrl + url, {
      headers: this.getHttpHeader(),
      params: params
    }).pipe<TResponse, TResponse>(

      map((data: TResponse) => {

        this.blockUI.stop();

        if (showMessage)
          this.toastr.success('درخواست با موفقیت انجام شد');

        return data;

      }), catchError<any, any>(e => this.handleError(e, showMessage))
    );

  }

  getHttpHeader(checkKeys: boolean = true) {
    const privateKey = this.configService.getCurrentPrivateKey();
    const publicKey = this.configService.getCurrentPublicKey();
    if (checkKeys && (!privateKey || !publicKey)) {
      this.toastr.error('شناسه ی کاربری یافت نشد , مجددا وارد شوید')
      this.router.navigateByUrl('/login');
    }

    else
      return new HttpHeaders({ PrivateKey: privateKey, PublicKey: publicKey });
  }

  handleError(error, showMessage: boolean) {

    this.blockUI.stop();

    if (error && error.error && error.error.ShowError) {

      this.toastr.error(error.error.Message);

      return null;

    }

    if (showMessage)
      this.toastr.error('خطایی در سیستم رخ داد');
  }

}
