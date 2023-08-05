import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IEmployeeLogin} from "src/app/model/dto/employee.login.interface";
import {Lang} from "src/app/model/orm/lang.model";
import {Words} from "src/app/model/orm/words.type";
import {AppService} from "src/app/services/app.service";
import {AuthService} from "src/app/services/auth.service";
import {GoogleService} from "src/app/services/google.service";
import {LangRepository} from "src/app/services/repositories/lang.repository";
import {WordRepository} from "src/app/services/repositories/word.repository";
import {SocketService} from "src/app/services/socket.service";

@Component({
  selector: "login-auth-page",
  templateUrl: "login.auth.page.html",
  styleUrls: ["../../../common.styles/forms.scss", "login.auth.page.scss"],
})
export class LoginAuthPage implements OnInit, OnDestroy {
  public langSubscription: Subscription = null;
  public email: string = "";
  public password: string = "";
  public formErrorDenied: boolean = false;
  public formLoading: boolean = false;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private socketService: SocketService,
    private googleService: GoogleService,
    private wordRepository: WordRepository,
    private langRepository: LangRepository,
    private router: Router,
  ) {
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  get langs(): Lang[] {
    return this.langRepository.langs;
  }

  public ngOnInit(): void {
    this.authService.authData.value !== null ? this.router.navigateByUrl("/") : null;
    this.initTitle();
  }

  public ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
  }

  private initTitle(): void {
    this.appService.setTitle(this.words["restorator-login"]["title"][this.currentLang.slug]);
    this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-login"]["title"][lang.slug]));
  }

  public async login(): Promise<void> {
    try {
      if (this.validate()) {
        this.formLoading = true;
        this.formErrorDenied = false;
        let dto: IEmployeeLogin = {email: this.email, password: this.password};
        let statusCode: number = await this.authService.login(dto);
        this.formLoading = false;

        if (statusCode === 200) {
          let lang = this.langs.find(l => l.id === this.authService.authData.value.employee.restaurant.lang_id);
          lang ? this.appService.setLang(lang) : null;
          this.router.navigateByUrl("/");
          this.socketService.connect();
        } else if (statusCode === 401) {
          this.formErrorDenied = true;
        } else {
          this.appService.showError(this.words['common']['error'][this.currentLang.slug]);
        }
      }
    } catch (err) {
      this.appService.showError(err);
      this.formLoading = false;
    }
  }

  public loginWithGoogle(): void {
    this.googleService.signIn();
  }

  public validate(): boolean {
    this.email = this.email.trim();
    this.password = this.password.trim();

    return this.email.length > 0 && this.password.length > 0;
  }
}
