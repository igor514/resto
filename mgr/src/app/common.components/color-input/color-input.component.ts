import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AdmLang } from "src/app/model/admlang.model";
import { AdmLangRepository } from "src/app/services/repositories/admlang.repository";

@Component({
    selector: "color-input",
    templateUrl: "color-input.component.html",
    styleUrls: ["color-input.component.scss"],
})
export class ColorInputComponent {
    @Input() color: string;
    @Output() colorChange: EventEmitter<string> = new EventEmitter();
    public pickerActive: boolean = false;

    constructor(private admlangRepository: AdmLangRepository) {}

    get currentLang(): AdmLang {return this.admlangRepository.currentLang;}

    public setColor(color: string): void {        
        this.colorChange.emit(color);
    }
}