import { Component, Input, OnInit } from '@angular/core';

import { Lang } from 'src/app/model/orm/lang.model';
import { Serving } from 'src/app/model/orm/serving.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-serving",
    templateUrl: "./serving.component.html"
})
export class ServingComponent extends ObjectComponent<Serving> implements OnInit {    
    @Input() x: Serving;  
    @Input() ll: Lang[] = [];    
    public selectedLang: Lang;     

    public ngOnInit(): void {
        this.selectedLang = this.ll[0];
    }        
}
