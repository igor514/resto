import { Component, Input, OnInit } from '@angular/core';

import { Lang } from 'src/app/model/orm/lang.model';
import { EmployeeStatus } from 'src/app/model/orm/employee.status.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-employee-status",
    templateUrl: "./employee.status.component.html"
})
export class EmployeeStatusComponent extends ObjectComponent<EmployeeStatus> implements OnInit {    
    @Input() x: EmployeeStatus;  
    @Input() ll: Lang[] = [];    
    public selectedLang: Lang;     

    public ngOnInit(): void {
        this.selectedLang = this.ll[0];
    }        
}
