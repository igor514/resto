import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {IAdminAuthData} from '../model/dto/admin.authdata.interface';
import {environment} from '../../environments/environment.prod';
import {Injectable} from "@angular/core";

@Injectable()
export class RequestService {
  protected readonly apiVersion = '1';
  protected root = environment.api_url + '/api';
  protected route = '';
  private _authData: IAdminAuthData = null;

  public get authData(): IAdminAuthData {
    return this._authData
  }

  public set authData(value: IAdminAuthData) {
    this._authData = value
  }

  constructor(
    protected http: HttpClient,
    protected errorService: ErrorService,
  ) {
  }

  protected sendRequest(url: string, body = {}, authNeeded: boolean = false, withProgress: boolean = false, apiVersion = this.apiVersion): Observable<any> | null {
    let headers: HttpHeaders | null = null;

    if (authNeeded) {
      headers = new HttpHeaders({token: this.authData.token});
    }

    if (withProgress) {
      return this.http
        .post(`${this.root}/v${apiVersion}${this.route}/${url}`, body, {
          headers,
          observe: 'events',
          reportProgress: true
        })
        .pipe(filter(res => this.errorService.processResponse(res)));
    } else {
      return this.http
        .post(`${this.root}/v${apiVersion}${this.route}/${url}`, body, {headers})
        .pipe(filter(res => this.errorService.processResponse(res)));
    }
  }
}
