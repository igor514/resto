import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/model/orm/employee.model';
import { EmployeeStatus } from 'src/app/model/orm/employee.status.model';
import { Lang } from 'src/app/model/orm/lang.model';
import { Restaurant } from 'src/app/model/orm/restaurant.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-employee",
    templateUrl: "./employee.component.html"
})
export class EmployeeComponent extends ObjectComponent<Employee> {        
    @Input() rl: Restaurant[] = [];    
    @Input() esl: EmployeeStatus[] = [];    
    @Input() ll: Lang[] = [];
}
