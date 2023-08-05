import { Component } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "head-desktop",
    templateUrl: "head-desktop.component.html",
    styleUrls: ["head-desktop.component.scss"],
})
export class HeadDesktopComponent {    
    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,        
        private authService: AuthService,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get title(): string {return this.appService.title;}    
    get showLogout(): boolean {return this.authService.authData !== null;}   
    set langPanelActive(v: boolean) {this.appService.langPanelActive = v;}     
}