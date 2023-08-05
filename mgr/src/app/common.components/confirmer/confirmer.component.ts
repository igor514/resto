import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AdmLang } from "src/app/model/admlang.model";
import { AdmLangRepository } from "src/app/services/repositories/admlang.repository";

@Component({
    selector: "the-confirmer",
    templateUrl: "confirmer.component.html",
    styleUrls: ["confirmer.component.scss"]
})
export class ConfirmerComponent {
    @Input() word: string = "confirm";
    @Input() active: boolean = false;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();
    @Output() confirm: EventEmitter<void> = new EventEmitter();
    public input: string = "";

    constructor(private admlangRepository: AdmLangRepository) {}

    get currentLang(): AdmLang {return this.admlangRepository.currentLang;}

    public close(): void {
        this.activeChange.emit(false);
    }

    public doConfirm(): void {
        if (this.input === this.word) {
            this.confirm.emit();
            this.activeChange.emit(false);
        }
    }
}