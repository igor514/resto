import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { AdminRepository } from '../../../services/repositories/admin.repository';
import { AppService } from '../../../services/app.service';
import { Admin } from '../../../model/orm/admin.model';
import { AdmingroupRepository } from '../../../services/repositories/admingroup.repository';
import { Admingroup } from '../../../model/orm/admingroup.model';
import { AuthService } from '../../../services/auth.service';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'admins-edit-page',
	templateUrl: './admins.edit.page.html',	
})
export class AdminsEditPage extends ObjectPage<Admin> implements OnInit {
	public x: Admin | null = null;
	public homeUrl: string = "/admins";
	public requiredFields: string[] = ["name", "email"];	

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected adminRepository: AdminRepository,
		private admingroupRepository: AdmingroupRepository,
		protected appService: AppService,		
		protected router: Router,
		private route: ActivatedRoute,	
		private authService: AuthService,	
	) {
		super(admlangRepository, adminRepository, appService, router);
	}

	get agl(): Admingroup[] {return this.admingroupRepository.xlAll;}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {				
				this.x = await this.adminRepository.loadOne(parseInt(p["id"]));
				await this.admingroupRepository.loadAll();
				this.appService.monitorLog("[admins edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}

	public async update(): Promise<boolean> {
		let res: boolean = await super.update();
		
		if (res && this.x.id === this.authService.authData.admin.id) {
			this.authService.updateAdmin(this.x);
		}

		return res;
	}
}
