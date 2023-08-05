import { Component, Input } from '@angular/core';
import { Cat } from 'src/app/model/orm/cat.model';
import { Icon } from 'src/app/model/orm/icon.model';
import { Lang } from 'src/app/model/orm/lang.model';
import { Restaurant } from 'src/app/model/orm/restaurant.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-cat",
    templateUrl: "./cat.component.html"
})
export class CatComponent extends ObjectComponent<Cat> {        
    @Input() rl: Restaurant[] = [];    
    @Input() il: Icon[] = [];    
    @Input() ll: Lang[] = [];
}
