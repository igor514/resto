import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/orm/product.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { ProductRepository } from 'src/app/services/repositories/product.repository';
import { ObjectPage } from '../../_object.page';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { Restaurant } from 'src/app/model/orm/restaurant.model';

@Component({
	selector: 'products-edit-page',
	templateUrl: './products.edit.page.html',	
})
export class ProductsEditPage extends ObjectPage<Product> implements OnInit {
	public x: Product = null;
	public homeUrl: string = "/restaurants/products";	
	public requiredFields: string[] = ["name"];		
	
	constructor(
		protected admlangRepository: AdmLangRepository,
		protected productRepository: ProductRepository,			
		protected restaurantRepository: RestaurantRepository,
		protected appService: AppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, productRepository, appService, router);
	}	
	
	get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}		
	
	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.x = await this.productRepository.loadOne(parseInt(p["id"]));				
				await this.restaurantRepository.loadAllWithCats();			
				this.appService.monitorLog("[products edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
