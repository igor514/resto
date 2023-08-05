import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: "checkbox-slider",
    templateUrl: "./checkbox-slider.component.html",
    styleUrls: ["./checkbox-slider.component.scss"]
})
export class CheckboxSliderComponent {    
    @Input() disabled: boolean = false;
    @Input() value: boolean = false;    
    @Output() valueChange: EventEmitter<boolean> = new EventEmitter();    

    public onClick(): void {        
        if (!this.disabled) {
            this.valueChange.emit(!this.value);    
        }        
    }
}
