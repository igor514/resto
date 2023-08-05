import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { UnitsListPage } from './list/units.list.page';
import { UnitsCreatePage } from './create/units.create.page';
import { UnitsEdit } from './edit/units.edit';
import { UnitsComponent } from './units.component';

let routing = RouterModule.forChild ([
  {path:"", component: UnitsListPage, pathMatch: "full"},
  {path:"create", component: UnitsCreatePage, pathMatch: "full"},
  {path:"edit/:id", component: UnitsEdit},
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CCModule,
    routing,
  ],
  declarations: [
    UnitsListPage,
    UnitsCreatePage,
    UnitsEdit,
    UnitsComponent,
  ]
})
export class UnitsModule { }
