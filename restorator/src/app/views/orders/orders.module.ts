import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { AdminGuard } from "src/app/services/admin.guard";
import { FinanceGuard } from "src/app/services/finance.guard";
import { OrderProductEditableComponent } from "./components/order-product-editable/order-product-editable.component";
import { OrderProductComponent } from "./components/order-product/order-product.component";
import { OrderComponent } from "./components/order/order.component";
import { ProductFinderComponent } from "./components/product-finder/product-finder.component";
import { CreateAllOrdersPage } from "./pages/all.create/create.all.orders.page";
import { EditAllOrdersPage } from "./pages/all.edit/edit.all.orders.page";
import { IndexAllOrdersPage } from "./pages/all.index/index.all.orders.page";
import { CreateMyOrdersPage } from "./pages/my.create/create.my.orders.page";
import { EditMyOrdersPage } from "./pages/my.edit/edit.my.orders.page";
import { IndexMyOrdersPage } from "./pages/my.index/index.my.orders.page";
import { IndexNewOrdersPage } from "./pages/new.index/index.new.orders.page";
import { ViewNewOrdersPage } from "./pages/new.view/view.new.orders.page";
import {MyGroupPage} from "./pages/my.group/my.group.page";
import {
  OrderProductResponsiveComponent
} from "./components/order-product-responsive/order-product-responsive.component";

let routes = RouterModule.forChild ([
	{path: "new", component: IndexNewOrdersPage, pathMatch: "full", canActivate: [FinanceGuard]},
	{path: "new/view/:id", component: ViewNewOrdersPage, canActivate: [FinanceGuard]},
	{path: "my", component: IndexMyOrdersPage, pathMatch: "full", canActivate: [FinanceGuard]},
  {path: "my/group", component: MyGroupPage, canActivate: [FinanceGuard]},
	{path: "my/edit/:id", component: EditMyOrdersPage, canActivate: [FinanceGuard]},
	{path: "my/create", component: CreateMyOrdersPage, canActivate: [FinanceGuard]},
	{path: "all", component: IndexAllOrdersPage, pathMatch: "full", canActivate: [AdminGuard]},
	{path: "all/edit/:id", component: EditAllOrdersPage, canActivate: [AdminGuard]},
	{path: "all/create", component: CreateAllOrdersPage, canActivate: [AdminGuard]},
	{path: "**", redirectTo: "/orders/new"},
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
		IndexNewOrdersPage,
		IndexMyOrdersPage,
		ViewNewOrdersPage,
		EditMyOrdersPage,
		CreateMyOrdersPage,
    MyGroupPage,
		IndexAllOrdersPage,
		EditAllOrdersPage,
		CreateAllOrdersPage,
		OrderComponent,
		OrderProductComponent,
		OrderProductEditableComponent,
    OrderProductResponsiveComponent,
		ProductFinderComponent,
	],
})
export class OrdersModule {}
