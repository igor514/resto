import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { GoogleService } from "src/app/services/google.service";
import { LangRepository } from "src/app/services/repositories/lang.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { SocketService } from "src/app/services/socket.service";

@Component({
    selector: "google-entered-auth-page",
    templateUrl: "google-entered.auth.page.html",    
})
export class GoogleEnteredAuthPage implements OnInit {
    constructor(
        private wordRepository: WordRepository,  
        private langRepository: LangRepository,
        private appService: AppService,        
        private googleService: GoogleService,
        private authService: AuthService,  
        private socketService: SocketService,
        private router: Router,        
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}
    get words(): Words {return this.wordRepository.words;}
    get langs(): Lang[] {return this.langRepository.langs;}

    public ngOnInit(): void {        
        this.processGoogleData();           
    }

    private async processGoogleData(): Promise<void> {
        try {                        
            this.googleService.buildToken();    
            let email: string = await this.googleService.getUserEmail();              
            let statusCode: number = await this.authService.loginByEmail(email); 
    
            if (statusCode === 200) {
                let lang = this.langs.find(l => l.id === this.authService.authData.value.employee.restaurant.lang_id);                    
                lang ? this.appService.setLang(lang) : null;
                this.socketService.connect();
                this.router.navigateByUrl("/");                            
            } else if (statusCode === 401) {
                //this.appService.showError(this.words['common']['error-401'][this.currentLang.slug]);	
                this.router.navigateByUrl("/auth/login");			
            } else {
                this.appService.showError(this.words['common']['error'][this.currentLang.slug]);				
                this.router.navigateByUrl("/auth/login");	
            }
        } catch (err) {
            this.appService.showError(err);
        } 
    }
}