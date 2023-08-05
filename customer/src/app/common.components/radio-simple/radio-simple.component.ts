import { Component, Input } from "@angular/core";

@Component({
    selector: "radio-simple",
    templateUrl: "radio-simple.component.html",
    styleUrls: ["radio-simple.component.scss"],
})
export class RadioSimpleComponent {
    @Input() checked: boolean = false;
    @Input() title: string = "";
}