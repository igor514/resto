import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Table } from "src/app/model/orm/table.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "create-table",
    templateUrl: "create-table.component.html",
    styleUrls: ["../../../../common.styles/popup.scss", "../../../../common.styles/entity-map.scss"],
})
export class CreateTableComponent {
    @Input() active: boolean = false;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();
    @Output() create: EventEmitter<Table> = new EventEmitter();
    public table: Table = new Table().init();

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public close(): void {
        this.activeChange.emit(false);
    }

    public onCreate(): void {
        this.create.emit(this.table);
        this.close();
        this.table = new Table().init();
    }
}
