import {Injectable} from "@angular/core";
import {IEmployeeAuthData} from "../model/dto/employee.authdata.interface";
import {IEmployeeConfirm} from "../model/dto/employee.confirm.interface";
import {IEmployeeLogin} from "../model/dto/employee.login.interface";
import {IEmployeeSetStatus} from "../model/dto/employee.setstatus.interface";
import {IEmployeeUpdatePassword} from "../model/dto/employee.updatepassword.interface";
import {Employee} from "../model/orm/employee.model";
import {DataService} from "./data.service";
import {AuthStorage} from "./auth-storage.service";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class AuthService {
  private interval: number = null;

  constructor(
    private authStorage: AuthStorage,
    private dataService: DataService,
  ) {
    let data: string = localStorage.getItem("authdata");
    data ? this.init(JSON.parse(data)) : null;
  }

  get authData(): BehaviorSubject<IEmployeeAuthData> {
    return this.authStorage.authData;
  }

  private init(data: IEmployeeAuthData): void {
    this.authStorage.authData.next({token: data.token, employee: new Employee().build(data.employee)});
    this.startChecking(); // периодически проверяем актуальность аккаунта и получаем данные пользователя и ресторана
  }

  public login(dto: IEmployeeLogin): Promise<number> {
    return new Promise((resolve, reject) => {
      this.dataService.employeesLogin(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.init(res.data);
          this.save();
        }

        resolve(res.statusCode);
      }, err => {
        reject(err.message);
      });
    });
  }

  public loginByEmail(email: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.dataService.employeesLoginByEmail(email).subscribe(res => {
        if (res.statusCode === 200) {
          this.init(res.data);
          this.save();
        }

        resolve(res.statusCode);
      }, err => {
        reject(err.message);
      });
    });
  }

  public startChecking(): void {
    this.interval = window.setInterval(() => this.check().catch(err => console.log(err)), 10 * 1000);
  }

  public stopChecking(): void {
    window.clearInterval(this.interval);
  }

  public check(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.employeesCheck(this.authData.value.employee.id).subscribe(res => {
        if (res.statusCode === 200) {
          this.authData.next({token: this.authData.value.token, employee: new Employee().build(res.data)});
          this.save();
          resolve();
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }

  public setStatus(employee_status_id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const employee = this.authData.value.employee;
      employee.employee_status_id = employee_status_id;
      this.authData.next({token: this.authData.value.token, employee});
      this.save();
      const dto: IEmployeeSetStatus = {employee_id: this.authData.value.employee.id, employee_status_id};
      this.dataService.employeeSetStatus(dto).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message));
    });
  }

  public confirm(password: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const dto: IEmployeeConfirm = {id: this.authData.value.employee.id, password};
      this.dataService.employeesConfirm(dto).subscribe(res => resolve(res.statusCode), err => reject(err.message));
    });
  }

  public updatePassword(dto: IEmployeeUpdatePassword): Promise<number> {
    return new Promise((resolve, reject) => this.dataService.employeesUpdatePassword(dto).subscribe(res => resolve(res.statusCode), err => reject(err.message)));
  }

  public logout(): void {
    this.stopChecking();
    this.authData.next(null);
    localStorage.removeItem("authdata");
  }

  public save(): void {
    if (this.authData.value) {
      localStorage.setItem("authdata", JSON.stringify(this.authData.value));
    }
  }
}
