import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { HallRepository } from "src/app/services/repositories/hall.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "edit-halls-page",
    templateUrl: "edit.halls.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class EditHallsPage implements OnInit, OnDestroy {
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
        private route: ActivatedRoute,  
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
        this.appService.setTitle(this.words["restorator-halls"]["title-edit"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-halls"]["title-edit"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private async initHall(): Promise<void> {
        try {
            this.hall = await this.hallRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
        } catch (err) {
            this.appService.showError(err);
        }        
    }    

    public async update(): Promise<void> {
        try {                 
            this.formLoading = true;            
            await this.hallRepository.update(this.hall);
            this.formLoading = false;            
            this.router.navigateByUrl("/halls-tables/halls");     
        } catch (err) {
            this.formLoading = false;
            this.appService.showError(err);
        }
    }    
}