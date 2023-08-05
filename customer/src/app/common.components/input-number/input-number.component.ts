import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "input-number",
    templateUrl: "input-number.component.html",
    styleUrls: ["input-number.component.scss"],
})
export class InputNumberComponent {
    @Input() value: number = 0;
    @Input() min: number = 0;
    @Input() max: number = 999999999;
    @Input() classname: string = "";
    @Output() valueChange: EventEmitter<number> = new EventEmitter();    

    public increase(): void {
        if (this.value < this.max) {
            this.value++;
            this.valueChange.emit(this.value);
        }
    }

    public decrease(): void {
        if (this.value > this.min) {
            this.value--;
            this.valueChange.emit(this.value);
        }
    }
}