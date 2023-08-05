import { Component, Input, OnInit } from "@angular/core";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { StatsRepository } from "src/app/services/repositories/stats.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "stat-yearly",
    templateUrl: "stat-yearly.component.html",
    styleUrls: ["stat-yearly.component.scss"],
})
export class StatYearlyComponent implements OnInit {
    @Input() color: string = "#000";    
    @Input() mode: string = "sums"; // sums | orders

    public xl: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    public xlMax: number = 0;    
    public xlPoints: string = "";
    public nullPoints: string = ""; // for animation    
    public currentDate: Date = null;
    public currentYear: number = null;          
    public years: number[] = [];
    public maxMonth: number = 0;

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
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();

        for (let i = 2020; i <= this.currentYear; i++) {
            this.years.push(i);
        }        
    }

    public async initStats(): Promise<void> {
        try {                                    
            this.xl = await this.statsRepository.loadYearly(this.restaurantId, this.currentYear, this.mode);     
            this.xlMax = Math.max(...this.xl);   
            this.maxMonth = this.currentYear === this.currentDate.getFullYear() ? this.currentDate.getMonth()+1 : 12;       
            this.buildGraph();              
        } catch (err) {
            this.appService.showError(err);
        }
    }    

    private async buildGraph(): Promise<void> {
        this.xlPoints = "";        
        this.nullPoints = "";
        await this.appService.pause(1); // to redraw the graph with animation
        
        for (let month = 0; month < this.maxMonth; month++) {            
            this.xlPoints += `${month*10},${100 - this.sum2percent(this.xl[month])} `;
            this.nullPoints += `${month*10},100 `;
        }
    }

    public sum2percent(sum: number): number {
        return this.xlMax ? 100 * sum / this.xlMax : 0;
    }     
}