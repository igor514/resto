import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { SettingRepository } from "src/app/services/repositories/setting.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-employee",
    templateUrl: "employee.component.html",    
})
export class EmployeeComponent implements OnInit, OnDestroy {
    @Input() x: Employee;
    @Input() mode: string = "create";
    @Input() loading: boolean = false;    
    @Input() errorEmailDuplication: boolean = false;    
    @Input() cmdSave: BehaviorSubject<boolean> = null;
    @Output() save: EventEmitter<void> = new EventEmitter();    

    private cmdSaveSubscription: Subscription = null;
    public errorEmail: boolean = false;    
    public errorPassword: boolean = false;        
    public errorName: boolean = false;  
    public saveConfirmActive: boolean = false;      

    constructor(
        protected appService: AppService,
        protected wordRepository: WordRepository,    
        protected settingRepository: SettingRepository,    
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get price(): number {return parseFloat(this.settingRepository.settings["price"]);}

    public ngOnInit(): void {
        this.cmdSaveSubscription = this.cmdSave?.subscribe(cmd => cmd ? this.onSave() : null);
    }

    public ngOnDestroy(): void {
        this.cmdSaveSubscription?.unsubscribe();
    }

    public onSave(): void {
        if (this.validate()) {
            this.saveConfirmActive = true;
        }
    }    

    public doSave(): void {
        this.saveConfirmActive = false;
        this.save.emit();
    }

    private validate(): boolean {
        let error = false;

        this.x.email = this.appService.trim(this.x.email);        
        this.x.password = this.appService.trim(this.x.password);        
        this.x.name = this.appService.trim(this.x.name);    
        
        if (!this.x.email.length || !this.appService.validateEmail(this.x.email)) {
            this.errorEmail = true;
            error = true;
        } else {
            this.errorEmail = false;
        }

        if (!this.x.name.length) {
            this.errorName = true;
            error = true;
        } else {
            this.errorName = false;
        }

        if (this.mode === "create") {
            if (!this.x.password.length) {
                this.errorPassword = true;
                error = true;
            } else {
                this.errorPassword = false;
            }
        }        

        return !error;
    }
}