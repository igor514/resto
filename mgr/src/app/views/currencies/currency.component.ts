import { Component, Input } from '@angular/core';

import { Currency } from 'src/app/model/orm/currency.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-currency",
    templateUrl: "./currency.component.html"
})
export class CurrencyComponent extends ObjectComponent<Currency> {    
    @Input() x: Currency;      
}
