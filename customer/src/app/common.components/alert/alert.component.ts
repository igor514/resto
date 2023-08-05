import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "the-alert",
    templateUrl: "alert.component.html",
    styleUrls: ["alert.component.scss"],
})
export class AlertComponent {
    @Input() active: boolean = false;
    @Input() msg: string = "";
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();    

    public close(): void {
        this.activeChange.emit(false);
    }
}