import {Component, Input, Output, EventEmitter, Inject} from "@angular/core";
import {STATIC_TOKEN} from "../../tokens";

@Component({
    selector: "image-viewer",
    templateUrl: "./imageviewer.component.html",
    styleUrls: ["./imageviewer.component.scss"],
})
export class ImageviewerComponent {
    @Input() img: string = "";
    @Input() imgFolder: string = "";
    @Input() active: boolean = false;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();

    constructor(
      @Inject(STATIC_TOKEN) protected staticPath: string,
    ) {}

    public close(): void {
        this.activeChange.emit(false);
    }
}
