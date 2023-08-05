import { Component, OnInit } from '@angular/core';
import { SectionPage } from '../_section.page';
import { AdmLangRepository } from '../../services/repositories/admlang.repository';
import { AppService } from '../../services/app.service';

@Component({
	selector: 'home-page',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],	
})
export class HomePage extends SectionPage implements OnInit {	
    public ready: boolean = false;

    constructor(
        protected admlangRepository: AdmLangRepository,
        private appService: AppService,
    ) {
        super(admlangRepository);
    }

    public ngOnInit(): void {
        this.appService.monitorLog("[home] page loaded");
        this.ready = true;
    }	
}
