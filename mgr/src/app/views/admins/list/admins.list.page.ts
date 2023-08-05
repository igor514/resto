import { Component, OnInit } from '@angular/core';

import { AdminRepository } from '../../../services/repositories/admin.repository';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmingroupRepository } from '../../../services/repositories/admingroup.repository';
import { Admingroup } from '../../../model/orm/admingroup.model';
import { AuthService } from '../../../services/auth.service';
import { Admin } from '../../../model/orm/admin.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';

@Component({
	selector: 'admins-list-page',
	templateUrl: './admins.list.page.html',	
})
export class AdminsListPage extends ListPage<Admin> implements OnInit {
    // inherited
    public homeUrl: string = "/admins";

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected adminRepository: AdminRepository, 
        private admingroupRepository: AdmingroupRepository,       
        protected appService: AppService,        
        private authService: AuthService,    
    ) {      
        super(admlangRepository, adminRepository, appService);
    }    
    
    get agl(): Admingroup[] {return this.admingroupRepository.xlAll;}    

    public async ngOnInit(): Promise<void> {
        try {
            await this.adminRepository.loadChunk();
            await this.admingroupRepository.loadAll();
            this.appService.monitorLog("[admins] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    } 
    
    public async updateParam (id: number, p: string, v: any): Promise<void> {
        try {
            await super.updateParam(id, p, v);
            id === this.authService.authData.admin.id ? this.authService.updateAdmin(this.xl.find(x => x.id === id)) : null;            
        } catch (err) {
            this.appService.monitorLog(err, true);
        }        
    }
}
