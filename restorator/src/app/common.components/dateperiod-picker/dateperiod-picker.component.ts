import { Component, Input, Output, EventEmitter, OnInit, HostListener } from "@angular/core";

import { IDay } from './day.interface';
import { AppService } from "src/app/services/app.service";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { Words } from "src/app/model/orm/words.type";
import { Lang } from "src/app/model/orm/lang.model";

@Component({
    selector: "dateperiod-picker",
    templateUrl: "./dateperiod-picker.component.html",
    styleUrls: ["./dateperiod-picker.component.scss"],
})
export class DatePeriodPickerComponent implements OnInit {
    @Input() value: Date[] = [null, null];            
    @Output() valueChange: EventEmitter<Date[]> = new EventEmitter();      
    public ready: boolean = false;    
    public active: boolean = false; 
    public mode: number = 0; // 0 - single date, 1 - period

    public days: IDay[][] = [[], []]; // will select
    private year: number[] = [0, 0]; // will select
    private month: number[] = [0, 0]; // will select
    private currentYear: number[] = [0, 0]; // now selected
    private currentMonth: number[] = [0, 0]; // now selected
    private currentDay: number[] = [0, 0]; // now selected    

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    
    public ngOnInit(): void {         
        this.init();
        this.ready = true;      
    }

    public formattedValue(i: number): string {
        return this.value[i] ? this.appService.formattedDate(this.value[i]) : this.words['common']['no-date'][this.currentLang.slug];
    }
    
    public monthAndYear(i: number): string {
        return `${this.appService.twoDigits(this.month[i]+1)}.${this.year[i]}`;
    }

    public toggle(): void {
        if (this.active) {
            this.active = false;
        } else {
            this.init();
            this.active = true;        
        }        
    }    

    private init(): void {
        for (let i = 0; i <= 1; i++) {
            let iniDate = this.value[i] || new Date();
            this.year[i] = this.currentYear[i] = iniDate.getFullYear();
            this.month[i] = this.currentMonth[i] = iniDate.getMonth();
            this.currentDay[i] = iniDate.getDate();
        }
        
        this.buildDays();        
    }

    private buildDays(): void {
        for (let i = 0; i <= 1; i++) {
            let firstDayOfMonth: number = new Date(this.year[i], this.month[i]).getDay() - 1;
            (firstDayOfMonth === -1) ? firstDayOfMonth = 6 : null;
            let daysInMonth: number = 32 - new Date(this.year[i], this.month[i], 32).getDate();        
            this.days[i] = [];

            for (let j: number = 0; j < firstDayOfMonth; j++) {
                let day: IDay = {hidden: true};
                this.days[i].push(day);
            }

            for (let j: number = 0; j < daysInMonth; j++) {
                let day: IDay = {n: j+1};
    
                if (j+1 === this.currentDay[i] && this.month[i] === this.currentMonth[i] && this.year[i] === this.currentYear[i]) {
                    day.current = true;
                }
    
                let index: number = firstDayOfMonth + j + 1;
    
                if (!(index % 7) || !((index+1) % 7)) {
                    day.holiday = true;
                }

                this.days[i].push(day);                            
            }
        }
    }    

    public onMonthBack(i: number): void {
        if (this.month[i] === 0) {
            this.month[i] = 11;
            this.year[i]--;
        } else {
            this.month[i]--;
        }

        this.buildDays();
    }

    public onMonthForward(i: number): void {
        if (this.month[i] === 11) {
            this.month[i] = 0;
            this.year[i]++;
        } else {
            this.month[i]++;
        }

        this.buildDays();
    }      

    public setDate(i: number, day: IDay): void {
        if (day.n) {
            this.currentDay[i] = day.n;
            this.currentMonth[i] = this.month[i];
            this.currentYear[i] = this.year[i];
        }

        this.buildDays();
    }

    public apply(): void {
        let value = [new Date(this.currentYear[0], this.currentMonth[0], this.currentDay[0])];
        value.push(this.mode ? new Date(this.currentYear[1], this.currentMonth[1], this.currentDay[1]) : null);
        this.valueChange.emit(value);
        this.active = false;
    }    

    public setNull(): void {
        this.value = [null, null];
        this.valueChange.emit(this.value);
        this.init();
    }    
}
