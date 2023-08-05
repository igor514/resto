import {Component, OnInit} from "@angular/core";
import {IEmployeeSum} from "src/app/model/dto/stats/employee.sum.interface";
import {Lang} from "src/app/model/orm/lang.model";
import {Words} from "src/app/model/orm/words.type";
import {AppService} from "src/app/services/app.service";
import {AuthService} from "src/app/services/auth.service";
import {StatsRepository} from "src/app/services/repositories/stats.repository";
import {WordRepository} from "src/app/services/repositories/word.repository";

@Component({
  selector: "stat-esm",
  templateUrl: "stat-esm.component.html",
  styleUrls: ["stat-esm.component.scss"],
})
export class StatESMComponent implements OnInit {
  public xl: IEmployeeSum[] = [];
  public xlSum: number = 0;
  public months: number[] = [];
  public years: number[] = [];
  public currentMonth: number = null;
  public currentYear: number = null;
  // длину окружности считаем равной 100, тогда радиус будет такой
  public radius: number = 15.91549430918954;

  constructor(
    private appService: AppService,
    private wordRepository: WordRepository,
    private statsRepository: StatsRepository,
    private authService: AuthService,
  ) {
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  get restaurantId(): number {
    return this.authService.authData.value.employee.restaurant_id;
  }

  get currency(): string {
    return this.authService.authData.value.employee.restaurant.currency.name
  }

  public ngOnInit(): void {
    this.initDates();
    this.initStats();
  }

  private initDates(): void {
    const date = new Date();
    this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.currentMonth = date.getMonth() + 1;
    this.currentYear = date.getFullYear();

    for (let i = 2021; i <= this.currentYear; i++) {
      this.years.push(i);
    }
  }

  public async initStats(): Promise<void> {
    try {
      const data = await this.statsRepository.loadEmployeeSumsMonthly(this.restaurantId, this.currentMonth, this.currentYear);
      this.xl = data.map((d, i) => ({name: d.name, sum: d.sum, active: false, color: this.buildColor(i)}));
      this.xlSum = this.xl.map(x => x.sum).reduce((a, b) => a + b);

      for (let x of this.xl) {
        await this.appService.pause(100);
        x.active = true;
      }
    } catch (err) {
      this.appService.showError(err);
    }
  }

  public sum2percent(sum: number): number {
    return this.xlSum ? 100 * sum / this.xlSum : 0;
  }

  public strokeDashArray(sum: number): string {
    const percent = this.sum2percent(sum);
    return `${percent} ${100 - percent}`;
  }

  public strokeDashOffset(index: number): number {
    let sum = 0;

    for (let i = 0; i < index; i++) {
      sum += this.sum2percent(this.xl[i].sum);
    }

    return 100 - sum + 25; // 25 - поворот на четверть от длины
  }

  private buildColor(index: number): string { // contrasting color!
    const hue = index * 137.508; // use golden angle approximation
    return `hsl(${hue},50%,60%)`;
  }
}
