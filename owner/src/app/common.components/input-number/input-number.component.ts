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
    @Input() step: number = 1;
    @Output() valueChange: EventEmitter<number> = new EventEmitter();    

    public increase(): void {
        if (this.value + this.step <= this.max) {
            this.value += this.step;
            this.valueChange.emit(this.value);
        }
    }

    public decrease(): void {
        if (this.value - this.step >= this.min) {
            this.value -= this.step;
            this.valueChange.emit(this.value);
        }
    }
}