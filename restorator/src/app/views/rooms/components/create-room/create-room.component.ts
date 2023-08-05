import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lang } from 'src/app/model/orm/lang.model';
import { Words } from 'src/app/model/orm/words.type';
import { AppService } from 'src/app/services/app.service';
import { WordRepository } from 'src/app/services/repositories/word.repository';
import {Room} from "../../../../model/orm/room.model";
import {RoomType} from "../../../../model/orm/room.type.model";

@Component({
    selector: 'create-room',
    templateUrl: 'create-room.component.html',
    styleUrls: ['../../../../common.styles/popup.scss', '../../../../common.styles/entity-map.scss'],
})
export class CreateRoomComponent {
    @Input() active = false;
    @Input() types: RoomType[] = []
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();
    @Output() create: EventEmitter<Room> = new EventEmitter();
    public item: Room = new Room().init();

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
    ) {}

    get words(): Words {return this.wordRepository.words; }
    get currentLang(): Lang {return this.appService.currentLang.value; }

    public close(): void {
        this.activeChange.emit(false);
    }

    public onCreate(): void {
        this.create.emit(this.item);
        this.close();
        this.item = new Room().init();
    }
}
