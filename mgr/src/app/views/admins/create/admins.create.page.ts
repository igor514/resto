import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { AdminRepository } from '../../../services/repositories/admin.repository';
import { AdmingroupRepository } from '../../../services/repositories/admingroup.repository';
import { AppService } from '../../../services/app.service';
import { Admingroup } from '../../../model/orm/admingroup.model';
import { Admin } from '../../../model/orm/admin.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'admins-create-page',
	templateUrl: './admins.create.page.html',	
})
export class AdminsCreatePage extends ObjectPage<Admin> implements OnInit {
	public x: Admin | null = null;
	public homeUrl: string = "/admins";
	public requiredFields: string[] = ["name", "email", "password"];	

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected adminRepository: AdminRepository,
		private admingroupRepository: AdmingroupRepository,     
		protected appService: AppService,		
		protected router: Router,		
	) {
		super(admlangRepository, adminRepository, appService, router);
	}

	get agl(): Admingroup[] {return this.admingroupRepository.xlAll;}

	public async ngOnInit(): Promise<void> {
		try {			
			this.x = new Admin().init();
			await this.admingroupRepository.loadAll();
			this.appService.monitorLog("[admins create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}
}
