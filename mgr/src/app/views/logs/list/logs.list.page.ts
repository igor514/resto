import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import {LogRepository} from "../../../services/repositories/logs.repository";
import {Log} from "../../../model/orm/log.model";
import {Admin} from "../../../model/orm/admin.model";
import {Employee} from "../../../model/orm/employee.model";

@Component({
	selector: 'transactions-list-page',
	templateUrl: './logs.list.page.html',
})
export class LogsListPage extends ListPage<Log> implements OnInit {
    public homeUrl: string = "/restaurants/transactions";
    public employees: Pick<Employee, 'id' | 'name'>[] = []
    public admins: Pick<Admin, 'id' | 'name'>[] = []

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected logRepository: LogRepository,
        protected appService: AppService,
    ) {
        super(admlangRepository, logRepository, appService);
    }

    get filterAdminId(): number {return this.logRepository.filterAdminId;}
    set filterAdminId(v: number) {this.logRepository.filterAdminId = v;}

    get filterEmployeeId(): number {return this.logRepository.filterEmployeeId;}
    set filterEmployeeId(v: number) {this.logRepository.filterEmployeeId = v;}

    public async ngOnInit(): Promise<void> {
        const sortByName = (a: {name: string}, b: {name: string}) => a.name >= b.name ? -1 : 1
        try {
            this.admins = (await this.logRepository.admins()).sort(sortByName)
            this.employees = (await this.logRepository.employees()).sort(sortByName)
            await this.logRepository.loadChunk();
            this.appService.monitorLog("[auth logs] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
