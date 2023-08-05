import { Component, Input } from '@angular/core';
import { Hall } from 'src/app/model/orm/hall.model';
import { Restaurant } from 'src/app/model/orm/restaurant.model';
import { ObjectComponent } from '../_object.component';
import { Table } from 'src/app/model/orm/table.model';

@Component({
    selector: "the-hall",
    templateUrl: "./hall.component.html"
})
export class HallComponent extends ObjectComponent<Hall> {        
    @Input() rl: Restaurant[] = [];    
    public tab: number = 1;    
    
    // tables
    public tablesSortBy: string = "no";
    public tablesSortDir: number = 1;   
    public tablesSubformActive: boolean = false;
    public table: Table = new Table().init();

    public tablesOnSubformKeyDown(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            event.preventDefault();
            this.tablesAdd();
        }
    }

    public tablesAdd(): void {
        this.x.tables.push(this.table);
        this.appService.sort(this.x.tables, this.tablesSortBy, this.tablesSortDir);
        this.table = new Table().init();
        this.tablesSubformActive = false;
    }

    public tablesChangeSorting(sortBy): void {
        if (sortBy === this.tablesSortBy) {
            this.tablesSortDir *= -1;            
        } else {
            this.tablesSortBy = sortBy;
            this.tablesSortDir = 1;
        }

        this.appService.sort(this.x.tables, this.tablesSortBy, this.tablesSortDir);
    }

    public tablesRemove(i: number): void {
        if (confirm(this.currentLang.phrases['workspace-sure'])) {
            this.x.tables.splice(i, 1);            
        }        
    }
}
