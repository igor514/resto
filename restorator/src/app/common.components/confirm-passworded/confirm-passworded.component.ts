import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "confirm-passworded",
    templateUrl: "confirm-passworded.component.html",
    styleUrls: ["../../common.styles/popup.scss"],
})
export class ConfirmPasswordedComponent implements OnChanges {
    @Input() active: boolean = false;
    @Input() msg: string = "";
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();
    @Output() confirmed: EventEmitter<void> = new EventEmitter();
    public password: string = "";
    public formLoading: boolean = false;    
    public formErrorPassword: boolean = false;
    public formError401: boolean = false;

    constructor(
        private appService: AppService,
        private authService: AuthService,
        private wordRepository: WordRepository,        
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnChanges(changes: SimpleChanges): void {        
        this.password = "";
    }

    public close(): void {
        this.activeChange.emit(false);
    }

    public async confirm(): Promise<void> {
        try {
            if (this.validate()) {
                this.formLoading = true;
                this.formError401 = false;    
                let statusCode = await this.authService.confirm(this.password);
                this.formLoading = false;
    
                if (statusCode === 200) {
                    this.confirmed.emit();
                    this.close();
                } else if (statusCode === 401) {
                    this.formError401 = true;
                } else {
                    this.appService.showError(this.words['common']['error'][this.currentLang.slug]);
                }               
            }
        } catch (err) {
            this.appService.showError(err);
            this.formLoading = false;
        }
    }

    public validate(): boolean {
        let error = false;       

        if (!this.password.length) {
            this.formErrorPassword = true;
            error = true;
        } else {
            this.formErrorPassword = false;
        }

        return !error;        
    }
}