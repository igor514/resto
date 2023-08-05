import { Component, OnInit } from "@angular/core";
import { ITableSum } from "src/app/model/dto/stats/table.sum.interface";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { StatsRepository } from "src/app/services/repositories/stats.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "stat-tsm",
    templateUrl: "stat-tsm.component.html",
    styleUrls: ["stat-tsm.component.scss"],
})
export class StatTSMComponent implements OnInit {
    public xl: ITableSum[] = [];
    public xlMax: number = 0;
    public months: number[] = [];
    public years: number[] = [];
    public currentMonth: number = null;
    public currentYear: number = null;

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private statsRepository: StatsRepository,
        private authService: AuthService,         
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}  
    get restaurantId(): number {return this.authService.authData.value.employee.restaurant_id;}

    public ngOnInit(): void {
        this.initDates();
        this.initStats();
    }

    private initDates(): void {        
        const date = new Date();        
        this.months = [1,2,3,4,5,6,7,8,9,10,11,12];
        this.currentMonth = date.getMonth() + 1;
        this.currentYear = date.getFullYear();

        for (let i = 2021; i <= this.currentYear; i++) {
            this.years.push(i);
        }        
    }

    public async initStats(): Promise<void> {
        try {
            const data = await this.statsRepository.loadTableSumsMonthly(this.restaurantId, this.currentMonth, this.currentYear);            
            this.xl = data.map(d => ({no: d.no, sum: d.sum, active: false}));
            this.xlMax = Math.max(...this.xl.map(x => x.sum));            
            
            for (let x of this.xl) {
                await this.appService.pause(100);
                x.active = true;                
            }
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public sum2percent(sum: number): number {
        return this.xlMax ? 100 * sum / this.xlMax : 0;
    }
}