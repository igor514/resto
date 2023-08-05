import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lang } from 'src/app/model/orm/lang.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';
import {RoomType} from "../../../model/orm/room.type.model";
import {RoomTypeRepository} from "../../../services/repositories/room.type.repository";

@Component({
	selector: 'room-types-create-page',
	templateUrl: './room.types.create.page.html',
})
export class RoomTypesCreatePage extends ObjectPage<RoomType> implements OnInit {
	public x: RoomType | null = null;
	public homeUrl: string = "/restaurants/room-types";
	public requiredFields: string[] = ["name", "priority"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected roomTypeRepository: RoomTypeRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,
		protected router: Router,
	) {
		super(admlangRepository, roomTypeRepository, appService, router);
	}

	get ll(): Lang[] {return this.langRepository.xlAll;}

	public async ngOnInit(): Promise<void> {
		try {
			await this.langRepository.loadAll();
			this.x = new RoomType().init(this.ll);
			this.appService.monitorLog("[room.types create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}
}
