import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IChunk } from "src/app/model/chunk.interface";
import { Employee } from "src/app/model/orm/employee.model";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { HallRepository } from "src/app/services/repositories/hall.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { IndexHallsService } from "./index.halls.service";

@Component({
    selector: "index-halls-page",
    templateUrl: "index.halls.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class IndexHallsPage implements OnInit, OnDestroy {    
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public hlChunk: IChunk<Hall> = null;
    public hlLoading: boolean = false;
    public hlSortingVariants: any[][] = // для мобильной верстки
        [["name", 1], ["name", -1], ["pos", 1], ["pos", -1]];   
    public deleteConfirmActive: boolean = false;
    public deleteConfirmMsg: string = "";
    private deleteId: number = null;

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,   
        private hallRepository: HallRepository,         
        private authService: AuthService,     
        private listService: IndexHallsService,    
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;}  
    get restaurantId(): number {return this.employee.restaurant_id;}
    get hl(): Hall[] {return this.hlChunk.data;}
    get hlAllLength(): number {return this.hlChunk.allLength;}  
    get hlCurrentPart(): number {return this.listService.currentPart;}
    set hlCurrentPart(v: number) {this.listService.currentPart = v;}    
    get hlLength(): number {return this.hallRepository.chunkLength;}   
    get hlSortBy(): string {return this.listService.sortBy;}
    set hlSortBy(v: string) {this.listService.sortBy = v;}
    get hlSortDir(): number {return this.listService.sortDir;}    
    set hlSortDir(v: number) {this.listService.sortDir = v;}
    get hlFilter(): any {return {restaurant_id: this.restaurantId};}

    public ngOnInit(): void {        
        this.initTitle();  
        this.initAuthCheck();   
        this.initHalls();           
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-halls"]["title-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-halls"]["title-index"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    public async initHalls(): Promise<void> {
        try {
            this.hlLoading = true;            
            this.hlChunk = await this.hallRepository.loadChunk(this.hlCurrentPart, this.hlSortBy, this.hlSortDir, this.hlFilter);                     
            
            if (this.hlCurrentPart > 0 && this.hlCurrentPart > Math.ceil(this.hlAllLength / this.hlLength) - 1) { // after deleting or filtering may be currentPart is out of possible diapason, then decrease and reload again            
                this.hlCurrentPart = 0;
                this.initHalls();
            } else {                
                await this.appService.pause(500);
                this.hlLoading = false;                
            }            
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.hlSortBy === sortBy) {
            this.hlSortDir *= -1;
        } else {
            this.hlSortBy = sortBy;
            this.hlSortDir = 1;
        }

        this.initHalls();
    }

    public setSorting(i: string): void {
        let sorting = this.hlSortingVariants[parseInt(i)];
        this.hlSortBy = sorting[0];
        this.hlSortDir = sorting[1];
        this.initHalls();
    }

    public onDelete(h: Hall): void {
        this.deleteId = h.id;
        this.deleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${h.name}"?`;
        this.deleteConfirmActive = true;
    }

    public async delete(): Promise<void> {
        try {
            this.deleteConfirmActive = false;
            this.hlLoading = true;            
            await this.hallRepository.delete(this.deleteId);
            this.initHalls();
        } catch (err) {
            this.appService.showError(err);
            this.hlLoading = false;
        }
    }  
}