import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {IAuthData} from "../model/authdata.interface";
import {filter} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class RequestService {
  protected readonly apiVersion = '1';
  protected root = environment.api_url + '/api';
  protected route = ''

  private _authData: IAuthData = null;

  public get authData(): IAuthData {
    return this._authData;
  }

  public set authData(value: IAuthData) {
    this._authData = value;
  }

  constructor(
    protected http: HttpClient,
    protected errorService: ErrorService,
  ) {
  }

  protected sendRequest(url: string, body: object = {}, authNeeded: boolean = false, withProgress: boolean = false, apiVersion = this.apiVersion): Observable<any> | null {
    let headers: HttpHeaders | null = null;

    if (authNeeded) {
      headers = new HttpHeaders({token: this.authData.token});
    }

    if (withProgress) {
      return this.http
        .post(`${this.root}/v${apiVersion}${this.route}${url}`, body, {headers, observe: 'events', reportProgress: true})
        .pipe(filter(res => this.errorService.processResponse(res)));
    } else {
      return this.http
        .post(`${this.root}/v${apiVersion}${this.route}${url}`, body, {headers})
        .pipe(filter(res => this.errorService.processResponse(res)));
    }
  }
}

