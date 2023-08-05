import {Component, OnInit} from '@angular/core';

import {AppService} from '../../../services/app.service';
import {ListPage} from '../../_list.page';
import {AdmLangRepository} from '../../../services/repositories/admlang.repository';
import {IconRepository} from '../../../services/repositories/icon.repository';
import {Icon, IconType} from '../../../model/orm/icon.model';
import {LangRepository} from 'src/app/services/repositories/lang.repository';
import {Lang} from 'src/app/model/orm/lang.model';

@Component({
	selector: 'icons-list-page',
	templateUrl: './icons.list.page.html',
})
export class IconsListPage extends ListPage<Icon> implements OnInit {
    public homeUrl: string = "/restaurants/icons";
    public selectedLang: Lang = null;

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected iconRepository: IconRepository,
        protected langRepository: LangRepository,
        protected appService: AppService,
    ) {
        super(admlangRepository, iconRepository, appService);
    }

    get filterIconType(): string {return this.iconRepository.filterIconType;}
    set filterIconType(v: string) {this.iconRepository.filterIconType = v;}

    get ll(): Lang[] {return this.langRepository.xlAll;}

    public async ngOnInit(): Promise<void> {
        try {
            await this.iconRepository.loadChunk();
            await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];
            this.appService.monitorLog("[icones] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }

  protected readonly IconType = IconType;
}
