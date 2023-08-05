import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/model/orm/order.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { OrderRepository } from 'src/app/services/repositories/order.repository';
import { ObjectPage } from '../../_object.page';
import { Hall } from 'src/app/model/orm/hall.model';
import { HallRepository2 } from 'src/app/services/repositories/hall.repository2';
import { EmployeeRepository2 } from 'src/app/services/repositories/employee.repository2';
import { Employee } from 'src/app/model/orm/employee.model';
import { ServingRepository } from 'src/app/services/repositories/serving.repository';
import { Serving } from 'src/app/model/orm/serving.model';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { Lang } from 'src/app/model/orm/lang.model';
import {FloorRepository} from '../../../services/repositories/floor.repository';
import {Room} from '../../../model/orm/room.model';

@Component({
	selector: 'orders-edit-page',
	templateUrl: './orders.edit.page.html',
})
export class OrdersEditPage extends ObjectPage<Order> implements OnInit {
	public x: Order = null;
	public homeUrl = '/restaurants/orders';

  public rm: Room[] = [];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected orderRepository: OrderRepository,
		protected hallRepository: HallRepository2,
		protected employeeRepository: EmployeeRepository2,

  protected floorsRepository: FloorRepository,
		protected servingRepository: ServingRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,
		protected router: Router,
		private route: ActivatedRoute,
	) {
		super(admlangRepository, orderRepository, appService, router);
	}

	get hl(): Hall[] {return this.hallRepository.xlAll; }
	get el(): Employee[] {return this.employeeRepository.xlAll; }
	get sl(): Serving[] {return this.servingRepository.xlAll; }
	get ll(): Lang[] {return this.langRepository.xlAll; }

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			try {
				this.x = await this.orderRepository.loadOne(parseInt(p.id));
				this.hallRepository.filterRestaurantId = this.x.restaurant_id;
				await this.hallRepository.loadAll();
				this.employeeRepository.filterRestaurantId = this.x.restaurant_id;
				await this.employeeRepository.loadAll();
				await this.servingRepository.loadAll();
				await this.langRepository.loadAll();
				this.appService.monitorLog('[orders edit] page loaded');
        await this.floorsRepository.loadAll();
        this.rm = this.floorsRepository.xlAll.reduce((acc: Room[], curr): Room[] => [...acc, ...curr.rooms], []);
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}
		});
	}
}
