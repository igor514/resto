import { Component, Input } from "@angular/core";

@Component({
    selector: "checkbox-simple",
    templateUrl: "checkbox-simple.component.html",
    styleUrls: ["checkbox-simple.component.scss"],    
})
export class CheckboxSimpleComponent {
    @Input() value: boolean = false;
    @Input() title: string = "";
}