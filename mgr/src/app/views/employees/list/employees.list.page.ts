import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { EmployeeRepository } from '../../../services/repositories/employee.repository';
import { Employee } from '../../../model/orm/employee.model';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { Restaurant } from 'src/app/model/orm/restaurant.model';

@Component({
	selector: 'employees-list-page',
	templateUrl: './employees.list.page.html',	
})
export class EmployeesListPage extends ListPage<Employee> implements OnInit {    
    public homeUrl: string = "/restaurants/employees";    

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected employeeRepository: EmployeeRepository,     
        protected restaurantRepository: RestaurantRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, employeeRepository, appService);
    }   
    
    get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}
    get filterRestaurantId(): number {return this.employeeRepository.filterRestaurantId;}
    set filterRestaurantId(v: number) {this.employeeRepository.filterRestaurantId = v;}
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.employeeRepository.loadChunk();             
            await this.restaurantRepository.loadAll();   
            this.appService.monitorLog("[employees] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
