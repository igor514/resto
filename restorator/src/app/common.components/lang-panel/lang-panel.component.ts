import { Component } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { LangRepository } from "src/app/services/repositories/lang.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "lang-panel",
    templateUrl: "lang-panel.component.html",
    styleUrls: ["../../common.styles/popup.scss"],
})
export class LangPanelComponent {
    constructor(
        private appService: AppService,        
        private langRepository: LangRepository,
        private wordRepository: WordRepository,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get langs(): Lang[] {return this.langRepository.langs;}
    get active(): boolean {return this.appService.langPanelActive;}
    set active(v: boolean) {this.appService.langPanelActive = v;}

    public close(): void {
        this.active = false;
    }

    public setLang(l: Lang): void {
        if (this.currentLang.id !== l.id) {
            this.appService.setLang(l);   
            this.close();     
        }    
    }  
}