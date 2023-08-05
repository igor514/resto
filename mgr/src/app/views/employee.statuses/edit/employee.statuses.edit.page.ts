import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeStatus } from 'src/app/model/orm/employee.status.model';
import { Lang } from 'src/app/model/orm/lang.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { EmployeeStatusRepository } from 'src/app/services/repositories/employee.status.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';

@Component({
	selector: 'employee-statuses-edit-page',
	templateUrl: './employee.statuses.edit.page.html',	
})
export class EmployeeStatusesEditPage extends ObjectPage<EmployeeStatus> implements OnInit {
	public x: EmployeeStatus | null = null;
	public homeUrl: string = "/restaurants/employee-statuses";	
	public requiredFields: string[] = ["name"];		
	
	constructor(
		protected admlangRepository: AdmLangRepository,
		protected employeeStatusRepository: EmployeeStatusRepository,			
		protected langRepository: LangRepository,		
		protected appService: AppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, employeeStatusRepository, appService, router);
	}	
	
	get ll(): Lang[] {return this.langRepository.xlAll;}	

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.x = await this.employeeStatusRepository.loadOne(parseInt(p["id"]));				
				await this.langRepository.loadAll();							
				this.appService.monitorLog("[employee.statuses edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
