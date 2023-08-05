import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: "input-text",
    templateUrl: "input-text.component.html",
    styleUrls: ["input-text.component.scss"],
})
export class InputTextComponent {
    @Input() value = '';
    @Output() valueChange: EventEmitter<string> = new EventEmitter();
    @Input() editable = true;

    public constructor(private ref: ChangeDetectorRef) {}

    private sanitize(val: string): void {
      this.value = val;
      this.valueChange.emit(this.value);
      this.ref.detectChanges();
    }
}
