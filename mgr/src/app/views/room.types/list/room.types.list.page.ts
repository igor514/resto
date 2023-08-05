import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { Lang } from 'src/app/model/orm/lang.model';
import {RoomType} from "../../../model/orm/room.type.model";
import {RoomTypeRepository} from "../../../services/repositories/room.type.repository";

@Component({
	selector: 'room-types-list-page',
	templateUrl: './room.types.list.page.html',
})
export class RoomTypesListPage extends ListPage<RoomType> implements OnInit {
    public homeUrl: string = "/restaurants/room-types";
    public selectedLang: Lang = null;

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected roomTypeRepository: RoomTypeRepository,
        protected langRepository: LangRepository,
        protected appService: AppService,
    ) {
        super(admlangRepository, roomTypeRepository, appService);
    }

    get ll(): Lang[] {return this.langRepository.xlAll;}

    public async ngOnInit(): Promise<void> {
        try {
            await this.roomTypeRepository.loadChunk();
            await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];
            this.appService.monitorLog("[room.types] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
