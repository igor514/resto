import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CCModule} from "src/app/common.components/cc.module";
import {IngredientComponent} from "./components/ingredient/ingredient.component";
import {CreateIngredientsPage} from "./pages/create/create.ingredients.page";
import {EditIngredientsPage} from "./pages/edit/edit.ingredients.page";
import {IndexIngredientsPage} from "./pages/index/index.ingredients.page";
import {IndexIngredientsService} from "./pages/index/index.ingredients.service";

let routes = RouterModule.forChild([
  {path: "", component: IndexIngredientsPage, pathMatch: "full"},
  {path: "create", component: CreateIngredientsPage, pathMatch: "full"},
  {path: "edit/:id", component: EditIngredientsPage},
  {path: "**", redirectTo: "/kitchen/ingredients"},
]);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    routes,
    CCModule,
  ],
  declarations: [
    IndexIngredientsPage,
    CreateIngredientsPage,
    EditIngredientsPage,
    IngredientComponent,
  ],
  providers: [
    IndexIngredientsService,
  ]
})
export class IngredientsModule {
}
