import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CCModule} from 'src/app/common.components/cc.module';
import {IngredientsListPage} from './list/ingredients.list.page';
import {IngredientsCreatePage} from './create/ingredients.create.page';
import {IngredientsEditPage} from './edit/ingredients.edit.page';
import {IngredientsComponent} from './ingredients.component';

let routing = RouterModule.forChild([
  {path: "", component: IngredientsListPage, pathMatch: "full"},
  {path: "create", component: IngredientsCreatePage, pathMatch: "full"},
  {path: "edit/:id", component: IngredientsEditPage},
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CCModule,
    routing,
  ],
  declarations: [
    IngredientsListPage,
    IngredientsCreatePage,
    IngredientsEditPage,
    IngredientsComponent,
  ]
})
export class IngredientsModule {
}
