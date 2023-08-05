import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {IEmployeeAuthData} from "../model/dto/employee.authdata.interface";

@Injectable()
export class AuthStorage {
  public authData: BehaviorSubject<IEmployeeAuthData> = new BehaviorSubject(null);
}
