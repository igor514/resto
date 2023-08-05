import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/orm/employee.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { EmployeeRepository } from 'src/app/services/repositories/employee.repository';
import { ObjectPage } from '../../_object.page';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { EmployeeStatusRepository } from 'src/app/services/repositories/employee.status.repository';
import { Restaurant } from 'src/app/model/orm/restaurant.model';
import { EmployeeStatus } from 'src/app/model/orm/employee.status.model';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { Lang } from 'src/app/model/orm/lang.model';

@Component({
	selector: 'employees-edit-page',
	templateUrl: './employees.edit.page.html',	
})
export class EmployeesEditPage extends ObjectPage<Employee> implements OnInit {
	public x: Employee = null;
	public homeUrl: string = "/restaurants/employees";	
	public requiredFields: string[] = ["name", "email"];		
	
	constructor(
		protected admlangRepository: AdmLangRepository,
		protected employeeRepository: EmployeeRepository,			
		protected restaurantRepository: RestaurantRepository,
		protected employeeStatusRepository: EmployeeStatusRepository,
		protected langRepository: LangRepository,	
		protected appService: AppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, employeeRepository, appService, router);
	}	
	
	get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}		
	get esl(): EmployeeStatus[] {return this.employeeStatusRepository.xlAll;}	
	get ll(): Lang[] {return this.langRepository.xlAll;}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.x = await this.employeeRepository.loadOne(parseInt(p["id"]));				
				await this.restaurantRepository.loadAll();			
				await this.employeeStatusRepository.loadAll();		
				await this.langRepository.loadAll();
				this.appService.monitorLog("[employees edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
