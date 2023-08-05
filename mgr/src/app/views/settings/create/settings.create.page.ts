import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { AppService } from '../../../services/app.service';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { Setting } from 'src/app/model/orm/setting.model';
import { SettingRepository } from 'src/app/services/repositories/setting.repository';

@Component({
	selector: 'settings-create-page',
	templateUrl: './settings.create.page.html',	
})
export class SettingsCreatePage extends ObjectPage<Setting> implements OnInit {
	public x: Setting | null = null;
	public homeUrl: string = "/settings";
	public imgFolder: string | null = null;
	public requiredFields: string[] = [];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected settingRepository: SettingRepository,
        protected appService: AppService,
		protected router: Router,		
	) {
		super(admlangRepository, settingRepository, appService, router);
	}

	public ngOnInit(): void {
		this.x = new Setting().init();
		this.appService.monitorLog("[settings create] page loaded");
		this.ready = true;
	}
}
