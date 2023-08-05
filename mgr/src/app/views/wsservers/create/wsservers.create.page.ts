import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ObjectPage } from '../../_object.page';
import { AppService } from '../../../services/app.service';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { WSServer } from 'src/app/model/orm/wsserver.model';
import { WSServerRepository } from 'src/app/services/repositories/wsserver.repository';

@Component({
	selector: 'wsservers-create-page',
	templateUrl: './wsservers.create.page.html',	
})
export class WSServersCreatePage extends ObjectPage<WSServer> implements OnInit {	
	public homeUrl: string = "/utils/wsservers";	
	public requiredFields: string[] = ["url"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected wsserverRepository: WSServerRepository,
        protected appService: AppService,
		protected router: Router,		
	) {
		super(admlangRepository, wsserverRepository, appService, router);
	}

	public ngOnInit(): void {
		this.x = new WSServer().init();
		this.appService.monitorLog("[wsservers create] page loaded");
		this.ready = true;
	}
}
