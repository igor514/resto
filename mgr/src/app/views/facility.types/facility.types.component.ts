import {Component, Input, OnInit} from '@angular/core';
import {Lang} from 'src/app/model/orm/lang.model';
import {ObjectComponent} from '../_object.component';
import {FacilityType} from "../../model/orm/facility.type.model";

@Component({
  selector: "the-facility-types",
  templateUrl: "./facility.types.component.html"
})
export class FacilityTypesComponent extends ObjectComponent<FacilityType> implements OnInit {
  @Input() x: FacilityType;
  @Input() ll: Lang[] = [];
  public selectedLang: Lang;

  public ngOnInit(): void {
    this.selectedLang = this.ll[0];
  }
}
