import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { FacilityTypesListPage } from './list/facility.types.list.page';
import { FacilityTypesCreatePage } from './create/facility.types.create.page';
import { FacilityTypesEdit } from './edit/facility.types.edit';
import { FacilityTypesComponent } from './facility.types.component';

let routing = RouterModule.forChild ([
  {path:"", component: FacilityTypesListPage, pathMatch: "full"},
  {path:"create", component: FacilityTypesCreatePage, pathMatch: "full"},
  {path:"edit/:id", component: FacilityTypesEdit},
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CCModule,
    routing,
  ],
  declarations: [
    FacilityTypesListPage,
    FacilityTypesCreatePage,
    FacilityTypesEdit,
    FacilityTypesComponent,
  ]
})
export class FacilityTypesModule { }
