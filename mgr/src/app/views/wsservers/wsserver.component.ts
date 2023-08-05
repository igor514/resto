import { Component, Input } from '@angular/core';
import { WSServer } from 'src/app/model/orm/wsserver.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-wsserver",
    templateUrl: "./wsserver.component.html"
})
export class WSServerComponent extends ObjectComponent<WSServer> {}
