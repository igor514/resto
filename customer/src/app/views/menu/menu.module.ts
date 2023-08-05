import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { CatMenuPage } from "./product-list/cat.menu.page";
import { RecommendedMenuPage } from "./product-list/recommended.menu.page";
import { ProductMenuPage } from "./product/product.menu.page";

let routes = RouterModule.forChild ([            
	{path: "recommended", component: RecommendedMenuPage},	
	{path: ":cat", component: CatMenuPage},	
	{path: ":cat/:product", component: ProductMenuPage},	
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
		CatMenuPage,
		RecommendedMenuPage,
		ProductMenuPage,
	],    		    
})
export class MenuModule {}