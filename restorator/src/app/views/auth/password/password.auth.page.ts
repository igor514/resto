import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IEmployeeUpdatePassword } from "src/app/model/dto/employee.updatepassword.interface";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "password-auth-page",
    templateUrl: "password.auth.page.html",    
    styleUrls: ["../../../common.styles/data.scss"],
})
export class PasswordAuthPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public password1: string = "";
    public password2: string = "";
    public formLoading: boolean = false;
    public formErrorPassword1: boolean = false;
    public formErrorPassword2: boolean = false;
    public formErrorMismatch: boolean = false;
    public alertActive: boolean = false;
    
    constructor(
        private appService: AppService,
        private authService: AuthService,
        private wordRepository: WordRepository,        
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;}

    public ngOnInit(): void {        
        this.initTitle();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-password"]["title"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-password"]["title"][lang.slug]));        
    }

    public async update(): Promise<void> {
        try {
            if (this.validate()) {
                this.formLoading = true;
                let dto: IEmployeeUpdatePassword = {id: this.employee.id, password: this.password1};
                let statusCode: number = await this.authService.updatePassword(dto);                
                this.formLoading = false;

                if (statusCode === 200) {
                    this.alertActive = true;
                } else {
                    this.appService.showError(this.words['common']['error'][this.currentLang.slug]);
                }
            }
        } catch (err) {
            this.appService.showError(err);
            this.formLoading = false;
        }
    }

    private validate(): boolean {
        this.password1 = this.password1.trim();
        this.password2 = this.password2.trim();
        let error = false;

        if (!this.password1.length) {
            this.formErrorPassword1 = true;
            error = true;
        } else {
            this.formErrorPassword1 = false;
        }

        if (!this.password2.length) {
            this.formErrorPassword2 = true;
            error = true;
        } else {
            this.formErrorPassword2 = false;
        }

        if (this.password1 !== this.password2) {
            this.formErrorMismatch = true;
            error = true;
        } else {
            this.formErrorMismatch = false;
        }

        return !error;
    }
}