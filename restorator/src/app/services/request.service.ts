import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ErrorService} from './error.service';
import {filter} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IEmployeeAuthData} from "../model/dto/employee.authdata.interface";
import {AuthStorage} from "./auth-storage.service";

type Options = HttpHeaders | { [p: string]: string | string[] }

@Injectable()
export class RequestService {
  protected readonly apiVersion = '1'
  public root = environment.api_url + '/api';
  protected route = ''

  public get authData(): BehaviorSubject<IEmployeeAuthData> {
    return this.authStorage.authData;
  }

  constructor(
    protected http: HttpClient,
    protected errorService: ErrorService,
    protected authStorage: AuthStorage,
  ) {
  }

  protected sendRequest(
    url: string,
    body = {},
    authNeeded: boolean = false,
    withProgress: boolean = false,
    options: Options = {},
    apiVersion = this.apiVersion
  ): Observable<any> | null {
    let headers: HttpHeaders | null = new HttpHeaders();

    if (authNeeded) {
      headers = new HttpHeaders({token: this.authData.value.token});
    }

    if (withProgress) {
      return this.http
        .post(`${this.root}/v${apiVersion}${this.route}/${url}`, body, {headers, observe: 'events', reportProgress: true, ...options})
        .pipe(filter(res => this.errorService.processResponse(res)));
    } else {
      return this.http
        .post(`${this.root}/v${apiVersion}${this.route}/${url}`, body, {headers, ...options})
        .pipe(filter(res => this.errorService.processResponse(res)));
    }
  }

  protected sendDownloadRequest(url: string, body = {}, authNeeded: boolean = false, apiVersion = this.apiVersion, filename: string): void {
    let headers: HttpHeaders | null = null;

    if (authNeeded) {
      headers = new HttpHeaders({token: this.authData.value.token});
    }

    this.http.post(`${this.root}/v${apiVersion}${this.route}/${url}`, body, {headers, responseType: 'blob'}).subscribe(response => {
      const dataType = response.type;
      const binaryData = [];
      binaryData.push(response);
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }
}
