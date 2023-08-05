import {DragDropModule} from "@angular/cdk/drag-drop";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SortablejsModule} from 'ngx-sortablejs';
import {CCModule} from "src/app/common.components/cc.module";
import {ProductComponent} from "./components/product/product.component";
import {CreateProductsPage} from "./pages/create/create.products.page";
import {EditProductsPage} from "./pages/edit/edit.products.page";
import {IndexProductsPage} from "./pages/index/index.products.page";
import {IndexProductsService} from "./pages/index/index.products.service";
import {NgSelectModule} from "@ng-select/ng-select";

let routes = RouterModule.forChild([
  {path: "", component: IndexProductsPage, pathMatch: "full"},
  {path: "create/:cat_id", component: CreateProductsPage},
  {path: "edit/:id", component: EditProductsPage},
  {path: "**", redirectTo: "/kitchen/products"},
]);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SortablejsModule,
    DragDropModule,
    NgSelectModule,
    routes,
    CCModule,
  ],
  declarations: [
    IndexProductsPage,
    CreateProductsPage,
    EditProductsPage,
    ProductComponent,
  ],
  providers: [
    IndexProductsService,
  ],
})
export class ProductsModule {
}
