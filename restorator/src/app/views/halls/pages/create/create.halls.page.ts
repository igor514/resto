import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { HallRepository } from "src/app/services/repositories/hall.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "create-halls-page",
    templateUrl: "create.halls.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CreateHallsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public hall: Hall = null;
    public formLoading: boolean = false; 
    public cmdSave: BehaviorSubject<boolean> = new BehaviorSubject(false);          

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,    
        private hallRepository: HallRepository,   
        private authService: AuthService,         
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {        
        this.initTitle();  
        this.initAuthCheck();      
        this.initHall();        
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-halls"]["title-create"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-halls"]["title-create"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private initHall(): void {
        this.hall = new Hall().init(this.authService.authData.value.employee.restaurant_id);
    }    

    public async create(): Promise<void> {
        try {                        
            this.formLoading = true;                
            await this.hallRepository.create(this.hall);
            this.formLoading = false;                
            this.router.navigateByUrl("/halls-tables/halls");                                        
        } catch (err) {
            this.formLoading = false;
            this.appService.showError(err);
        }
    }    
}