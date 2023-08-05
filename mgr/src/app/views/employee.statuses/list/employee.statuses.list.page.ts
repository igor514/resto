import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { EmployeeStatusRepository } from '../../../services/repositories/employee.status.repository';
import { EmployeeStatus } from '../../../model/orm/employee.status.model';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { Lang } from 'src/app/model/orm/lang.model';

@Component({
	selector: 'employee-statuses-list-page',
	templateUrl: './employee.statuses.list.page.html',	
})
export class EmployeeStatusesListPage extends ListPage<EmployeeStatus> implements OnInit {    
    public homeUrl: string = "/restaurants/employee-statuses";    
    public selectedLang: Lang = null;
    
    constructor(
        protected admlangRepository: AdmLangRepository,
        protected employeeStatusRepository: EmployeeStatusRepository,  
        protected langRepository: LangRepository,   
        protected appService: AppService,        
    ) {      
        super(admlangRepository, employeeStatusRepository, appService);
    }    

    get ll(): Lang[] {return this.langRepository.xlAll;}
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.employeeStatusRepository.loadChunk();     
            await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];           
            this.appService.monitorLog("[employee.statuses] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
