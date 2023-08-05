import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Lang} from 'src/app/model/orm/lang.model';
import {Words} from 'src/app/model/orm/words.type';
import {AppService} from 'src/app/services/app.service';
import {SettingRepository} from 'src/app/services/repositories/setting.repository';
import {WordRepository} from 'src/app/services/repositories/word.repository';
import {Table} from "../../model/orm/table.model";
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";
import {Room} from "../../model/orm/room.model";

@Component({
  selector: 'qr-panel',
  templateUrl: 'qr-panel.component.html',
  styleUrls: [
    '../../common.styles/popup.scss',
    '../../common.styles/entity-map.scss',
  ],
})
export class QRPanelComponent {
  @Input() item: Table | Room;
  @Input() active = false;
  @Input() timestamp = new Date().getTime();
  @Input() category: 'room' | 'table' = 'table'
  @Output() activeChange = new EventEmitter<boolean>();

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private dataService: DataService,
    private wordRepository: WordRepository,
    private settingRepository: SettingRepository,
  ) {
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  get customerUrl(): string {
    return this.settingRepository.settings["customer-app-url"];
  }

  get qrtext(): string {
    return `${this.customerUrl}/${this.category}/${this.item.code}`;
  }

  get imgUrl(): string {
    return this.dataService.qrLink(
      this.authService.authData.value.employee.restaurant.id,
      new URLSearchParams({
        text: this.qrtext,
        mode: 'get',
        timestamp: this.timestamp.toString()
      })
    )
  }

  get imgLink(): string {
    return this.dataService.qrLink(
      this.authService.authData.value.employee.restaurant.id,
      new URLSearchParams({text: this.qrtext, mode: 'get'})
    )
  }

  public close(): void {
    this.activeChange.emit(false);
  }
}
