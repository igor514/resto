import {Component, Input, OnInit} from '@angular/core';

import {Lang} from 'src/app/model/orm/lang.model';
import {ObjectComponent} from '../_object.component';
import {Unit} from "../../model/orm/unit.model";

@Component({
  selector: "the-unit",
  templateUrl: "./units.component.html"
})
export class UnitsComponent extends ObjectComponent<Unit> implements OnInit {
  @Input() x: Unit;
  @Input() ll: Lang[] = [];
  @Input() units: Unit[] = [];
  public selectedLang: Lang;

  public ngOnInit(): void {
    this.selectedLang = this.ll[0];
  }
}
