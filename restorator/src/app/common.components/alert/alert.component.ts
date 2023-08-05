import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "the-alert",
    templateUrl: "alert.component.html",
    styleUrls: ["../../common.styles/popup.scss"],
})
export class AlertComponent {
    @Input() active: boolean = false;
    @Input() msg: string = "";
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,        
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public close(): void {
        this.activeChange.emit(false);
    }
}