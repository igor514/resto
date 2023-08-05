import {Component, Input, Output, EventEmitter, OnInit, AfterViewInit, Inject} from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from "rxjs/operators";

import { URL } from '../../model/url';
import { Admin } from '../../model/orm/admin.model';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';
import { AdmLang } from 'src/app/model/admlang.model';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import {STATIC_TOKEN} from "../../tokens";

@Component({
  selector: 'the-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit {
  @Input() active: boolean = false;
  @Output() activeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  public email: string = "";
  public password: string = "";
  public errorEmail: boolean = false;
  public errorPassword: boolean = false;
  public subActive: boolean[] = [false, false, false, false];

  constructor(
    private authService: AuthService,
    private appService: AppService,
    private router: Router,
    private admlangRepository: AdmLangRepository,
    @Inject(STATIC_TOKEN) protected staticPath: string,
  ) {}

  get authenticated(): boolean {
    return this.authService.authData !== null;
  }

  get admin(): Admin {
    return this.authService.authData.admin;
  }

  get shortAdminName(): string {
    return this.admin.name.substr(0, 1);
  }

  get currentLang(): AdmLang {
    return this.admlangRepository.currentLang;
  }

  get currentUrl(): URL {
    return this.appService.currentUrl;
  }

  public async ngAfterViewInit(): Promise<void> {
    await this.appService.pause(1);
    this.buildSub();
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(event => {
        this.buildSub();
      });
  }

  private buildSub(): void {
    this.subActive[0] = this.appService.currentUrl.parts[0] === "settings";
    this.subActive[1] = this.appService.currentUrl.parts[0] === "localization";
    this.subActive[2] = this.appService.currentUrl.parts[0] === "restaurants";
    this.subActive[3] = this.appService.currentUrl.parts[0] === "utils";
  }

  public close(): void {
    this.activeChange.emit(false);
  }

  public toggleSub(i: number): void {
    this.subActive[i] = !this.subActive[i];
  }

  public async login(): Promise<void> {
    try {
      if (this.validateLogin()) {
        this.appService.monitorLog("authenticating...");
        await this.authService.login(this.email, this.password);
        this.appService.monitorLog("login accepted");
        this.router.navigateByUrl("/");
      }
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }

  private validateLogin(): boolean {
    this.appService.monitorLog("checking login form...");
    this.email = this.email.trim();
    let error = false;

    if (!this.email.length) {
      this.errorEmail = true;
      error = true;
      this.appService.monitorLog("e-mail empty", true);
    } else if (!this.appService.validateEmail(this.email)) {
      this.errorEmail = true;
      error = true;
      this.appService.monitorLog("e-mail incorrect", true);
    } else {
      this.errorEmail = false;
    }

    if (!this.password.length) {
      this.errorPassword = true;
      error = true;
      this.appService.monitorLog("password empty", true);
    } else {
      this.errorPassword = false;
    }

    return !error;
  }
}
