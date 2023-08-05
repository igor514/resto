import {RequestService} from "./request.service";
import {Observable} from "rxjs";
import {IAnswer} from "../model/answer.interface";
import {FeeDto} from "../model/dto/fee.dto";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "./error.service";
import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import {IAuthData} from "../model/authdata.interface";

@Injectable()
export class PaymentService extends RequestService {
  protected route = '/payments/'

  public get authData(): IAuthData {return this.dataService.authData}

  constructor(
    protected http: HttpClient,
    protected errorService: ErrorService,
    protected dataService: DataService,
  ) {
    super(http, errorService);
  }
  public balanceFees(type = 'stripe'): Observable<IAnswer<FeeDto[]>> {
    return this.sendRequest("balance/config", {type}, true);
  }

  public paymentTypes(): Observable<IAnswer<string[]>> {
    return this.sendRequest('types', null, true)
  }

  public updateFees(body: FeeDto): Observable<IAnswer<FeeDto[]>> {
    return this.sendRequest("balance/config/update", body, true);
  }
}
