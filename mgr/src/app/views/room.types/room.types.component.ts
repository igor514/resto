import {Component, Input, OnInit} from '@angular/core';

import {Lang} from 'src/app/model/orm/lang.model';
import {ObjectComponent} from '../_object.component';
import {RoomType} from "../../model/orm/room.type.model";

@Component({
  selector: "the-room-types",
  templateUrl: "./room.types.component.html"
})
export class RoomTypesComponent extends ObjectComponent<RoomType> implements OnInit {
  @Input() x: RoomType;
  @Input() ll: Lang[] = [];
  public selectedLang: Lang;

  public ngOnInit(): void {
    this.selectedLang = this.ll[0];
  }
}
