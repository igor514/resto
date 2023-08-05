import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { EmployeeRepository } from "src/app/services/repositories/employee.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "create-employees-page",
    templateUrl: "create.employees.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CreateEmployeesPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public employee: Employee = null;
    public formLoading: boolean = false;     
    public formErrorEmailDuplication: boolean = false; 
    public cmdSave: BehaviorSubject<boolean> = new BehaviorSubject(false);           

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,    
        private employeeRepository: EmployeeRepository,   
        private authService: AuthService,         
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {        
        this.initTitle();  
        this.initAuthCheck();      
        this.initEmployee();        
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-employees"]["title-create"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-employees"]["title-create"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private initEmployee(): void {
        this.employee = new Employee().init(this.authService.authData.value.employee.restaurant_id);
    }    

    public async create(): Promise<void> {
        try {            
            this.formLoading = true;
            this.formErrorEmailDuplication = false;
            const statusCode = await this.employeeRepository.create(this.employee);
            this.formLoading = false;            

            if (statusCode === 200) {
                this.authService.check();
                this.router.navigateByUrl("/employees");
            } else if (statusCode === 409) {
                this.formErrorEmailDuplication = true;
            } else {
                this.appService.showError(this.words['common']['error'][this.currentLang.slug]);
            }
        } catch (err) {
            this.formLoading = false;
            this.appService.showError(err);
        }
    }    
}