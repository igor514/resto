import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {ObjectComponent} from '../_object.component';
import {Floor} from '../../model/orm/floor.model';
import {Room} from '../../model/orm/room.model';
import {AdmLangRepository} from "../../services/repositories/admlang.repository";
import {AppService} from "../../services/app.service";
import {FilesService} from "../../services/files.service";
import {RoomTypeRepository} from "../../services/repositories/room.type.repository";
import {RoomType} from "../../model/orm/room.type.model";

@Component({
  selector: 'the-floor',
  templateUrl: './floors.component.html'
})
export class FloorsComponent extends ObjectComponent<Floor> implements OnInit {
  @Input() rl: Restaurant[] = [];
  public tab = 1;

  // rooms
  public sortBy = 'no';
  public sortDir = 1;
  public subformActive = false;
  public room: Room = new Room().init();

  public roomTypes: RoomType[] = [];

  constructor(
    protected typesRepository: RoomTypeRepository,
    protected admlangRepository: AdmLangRepository,
    protected appService?: AppService,
    protected filesService?: FilesService,
  ) {
    super(admlangRepository, appService, filesService);
  }

  ngOnInit(): void {
    this.typesRepository.loadAll().then(() => {
      this.roomTypes = this.typesRepository.xlAll;
    });
  }

  public onSubformKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.add();
    }
  }

  public add(): void {
    this.x.rooms.push(this.room);
    this.appService.sort(this.x.rooms, this.sortBy, this.sortDir);
    this.room = new Room().init();
    this.subformActive = false;
  }

  public changeSorting(sortBy): void {
    if (sortBy === this.sortBy) {
      this.sortDir *= -1;
    } else {
      this.sortBy = sortBy;
      this.sortDir = 1;
    }

    this.appService.sort(this.x.rooms, this.sortBy, this.sortDir);
  }

  public remove(i: number): void {
    if (confirm(this.currentLang.phrases['workspace-sure'])) {
      this.x.rooms.splice(i, 1);
    }
  }
}
