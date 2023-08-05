import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Lang} from 'src/app/model/orm/lang.model';
import {Words} from 'src/app/model/orm/words.type';
import {AppService} from 'src/app/services/app.service';
import {WordRepository} from 'src/app/services/repositories/word.repository';
import {Room} from '../../../../model/orm/room.model';

@Component({
  selector: 'the-room',
  templateUrl: 'room.component.html',
  styleUrls: ['../../../../common.styles/entity-map.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RoomComponent {
  @Input() item: Room;
  @Input() canDelete = true;
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() qr: EventEmitter<void> = new EventEmitter();
  @Output() history: EventEmitter<void> = new EventEmitter();

  constructor(
    private appService: AppService,
    private wordRepository: WordRepository,
  ) {
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  public onDelete(): void {
    this.delete.emit();
  }

  public onQr(): void {
    this.qr.emit();
  }

  public onHistory(): void {
    this.history.emit();
  }
}
