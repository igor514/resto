import { Component, Input } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { LangRepository } from "src/app/services/repositories/lang.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "head-mobile",
    templateUrl: "head-mobile.component.html",
    styleUrls: ["head-mobile.component.scss"],
})
export class HeadMobileComponent {    
    public menuPanelActive: boolean = false;
    public langPanelActive: boolean = false;    
    
    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,     
        private langRepository: LangRepository,   
        private authService: AuthService,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get langs(): Lang[] {return this.langRepository.langs;}
    get url(): string[] {return this.appService.url;}
    get title(): string {return this.appService.title;}
    get showMenuBtn(): boolean {return this.authService.authData !== null;}
    
    public setLang(l: Lang): void {
        if (this.currentLang.id !== l.id) {
            this.appService.setLang(l);   
            this.langPanelActive = false;
        }        
    }
}