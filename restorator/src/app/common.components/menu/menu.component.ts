import {AfterViewInit, Component} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Employee} from 'src/app/model/orm/employee.model';
import {Lang} from 'src/app/model/orm/lang.model';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {Words} from 'src/app/model/orm/words.type';
import {AppService} from 'src/app/services/app.service';
import {AuthService} from 'src/app/services/auth.service';
import {WordRepository} from 'src/app/services/repositories/word.repository';
import {SocketService} from 'src/app/services/socket.service';

@Component({
  selector: 'the-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent implements AfterViewInit {
  public subActive: boolean[] = [false, false, false];

  constructor(
    private appService: AppService,
    private wordRepository: WordRepository,
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router,
  ) {
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  get url(): string[] {
    return this.appService.url;
  }

  get employee(): Employee {
    return this.authService.authData.value.employee;
  }

  get restaurant(): Restaurant {
    return this.employee.restaurant;
  }

  get qNew(): number {
    return this.socketService.qNew;
  }

  get qMy(): number {
    return this.socketService.qMy;
  }

  public async ngAfterViewInit(): Promise<void> {
    await this.appService.pause(1);
    this.buildSub();
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(event => {
        this.buildSub();
      });
  }

  private buildSub(): void {
    this.subActive[0] = this.url[1] === 'halls-tables';
    this.subActive[1] = this.url[1] === 'rooms-floors';
    this.subActive[2] = this.url[1] === 'kitchen';
  }

  public toggleSub(i: number): void {
    this.subActive[i] = !this.subActive[i];
  }
}
