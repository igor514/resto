import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { RoomTypesListPage } from './list/room.types.list.page';
import { RoomTypesCreatePage } from './create/room.types.create.page';
import { RoomTypesEdit } from './edit/room.types.edit';
import { RoomTypesComponent } from './room.types.component';

let routing = RouterModule.forChild ([
  {path:"", component: RoomTypesListPage, pathMatch: "full"},
  {path:"create", component: RoomTypesCreatePage, pathMatch: "full"},
  {path:"edit/:id", component: RoomTypesEdit},
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CCModule,
    routing,
  ],
  declarations: [
    RoomTypesListPage,
    RoomTypesCreatePage,
    RoomTypesEdit,
    RoomTypesComponent,
  ]
})
export class RoomTypesModule { }
