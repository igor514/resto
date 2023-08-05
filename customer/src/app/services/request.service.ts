import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RequestService {
  protected apiVersion = '1';
  protected root: string = environment.api_url + "/api";
  protected route = ''

  constructor(protected http: HttpClient) {}

  protected sendRequest(url: string, body: object = null, apiVersion = this.apiVersion): Observable<any> {
    return this.http.post (`${this.root}/v${apiVersion}${this.route}${url}`, body);
  }
}
