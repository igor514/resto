import { Component, OnInit } from '@angular/core';
import { AdmLang } from 'src/app/model/admlang.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { SectionPage } from '../_section.page';

@Component({
	selector: 'options-page',
	templateUrl: './options.page.html',	
})
export class OptionsPage extends SectionPage implements OnInit {	
    public ready: boolean = false;
    public selectedLang: string = "";

    constructor(
        protected admlangRepository: AdmLangRepository,
        private appService: AppService,
    ) {
        super(admlangRepository);
    }	  
    
    get admlangs(): AdmLang[] {return this.admlangRepository.langs;}

    public ngOnInit(): void {
        this.selectedLang = this.currentLang.name;
        this.appService.monitorLog("[options] page loaded");
        this.ready = true;
    }

    public setCurrentLang(): void {
        this.admlangRepository.setCurrentLang(this.selectedLang);
        this.appService.monitorLog(`current language changed to ${this.selectedLang}`);
    }
}
