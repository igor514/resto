import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IChunk } from "src/app/model/chunk.interface";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { EmployeeRepository } from "src/app/services/repositories/employee.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { IndexEmployeesService } from "./index.employees.service";

@Component({
    selector: "index-employees-page",
    templateUrl: "index.employees.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class IndexEmployeesPage implements OnInit, OnDestroy {
    public elChunk: IChunk<Employee> = null;
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public elLoading: boolean = false;
    public elSortingVariants: any[][] = // для мобильной верстки
        [["created_at", 1], ["created_at", -1], ["name", 1], ["name", -1], ["employee_status_id", 1], ["employee_status_id", -1]];    
    public deleteConfirmActive: boolean = false;
    public deleteConfirmMsg: string = "";
    private deleteId: number = null;

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,    
        private employeeRepository: EmployeeRepository,   
        private authService: AuthService,      
        private listService: IndexEmployeesService,   
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;}  
    get restaurantId(): number {return this.employee.restaurant_id;}
    get el(): Employee[] {return this.elChunk.data;}
    get elAllLength(): number {return this.elChunk.allLength;}  
    get elCurrentPart(): number {return this.listService.currentPart;}
    set elCurrentPart(v: number) {this.listService.currentPart = v;}    
    get elLength(): number {return this.employeeRepository.chunkLength;}   
    get elFilterCreatedAt(): Date[] {return this.listService.filterCreatedAt;}  
    set elFilterCreatedAt(v: Date[]) {this.listService.filterCreatedAt = v;}
    get elFilterName(): string {return this.listService.filterName;}
    set elFilterName(v: string) {this.listService.filterName = v;}
    get elFilter(): any {return {restaurant_id: this.restaurantId, created_at: this.elFilterCreatedAt, name: this.elFilterName};}
    get elSortBy(): string {return this.listService.sortBy;}
    set elSortBy(v: string) {this.listService.sortBy = v;}
    get elSortDir(): number {return this.listService.sortDir;}    
    set elSortDir(v: number) {this.listService.sortDir = v;}

    public ngOnInit(): void {        
        this.initTitle();  
        this.initAuthCheck();      
        this.initEmployees();        
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-employees"]["title-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-employees"]["title-index"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    public async initEmployees(): Promise<void> {
        try {
            this.elLoading = true;            
            this.elChunk = await this.employeeRepository.loadChunk(this.elCurrentPart, this.elSortBy, this.elSortDir, this.elFilter);                                   

            if (this.elCurrentPart > 0 && this.elCurrentPart > Math.ceil(this.elAllLength / this.elLength) - 1) { // after deleting or filtering may be currentPart is out of possible diapason, then decrease and reload again            
                this.elCurrentPart = 0;
                this.initEmployees();
            } else {    
                await this.appService.pause(500);
                this.elLoading = false;                
            }
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.elSortBy === sortBy) {
            this.elSortDir *= -1;
        } else {
            this.elSortBy = sortBy;
            this.elSortDir = 1;
        }

        this.initEmployees();
    }

    public setSorting(i: string): void {
        let sorting = this.elSortingVariants[parseInt(i)];
        this.elSortBy = sorting[0];
        this.elSortDir = sorting[1];
        this.initEmployees();
    }

    public onDelete(e: Employee): void {
        this.deleteId = e.id;
        this.deleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${e.name}"?`;
        this.deleteConfirmActive = true;
    }

    public async delete(): Promise<void> {
        try {
            this.deleteConfirmActive = false;
            this.elLoading = true;            
            await this.employeeRepository.delete(this.deleteId);
            this.initEmployees();
        } catch (err) {
            this.appService.showError(err);
            this.elLoading = false;
        }
    }  
}