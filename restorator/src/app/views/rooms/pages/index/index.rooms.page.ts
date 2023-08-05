import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ICoord} from 'src/app/model/coord.interface';
import {Employee} from 'src/app/model/orm/employee.model';
import {Lang} from 'src/app/model/orm/lang.model';
import {Words} from 'src/app/model/orm/words.type';
import {AppService} from 'src/app/services/app.service';
import {AuthService} from 'src/app/services/auth.service';
import {WordRepository} from 'src/app/services/repositories/word.repository';
import {IndexAllOrdersService} from 'src/app/views/orders/pages/all.index/index.all.orders.service';
import {Floor} from '../../../../model/orm/floor.model';
import {Room} from '../../../../model/orm/room.model';
import {FloorRepository} from '../../../../services/repositories/floor.repository';
import {RoomType} from "../../../../model/orm/room.type.model";
import {RoomTypeRepository} from "../../../../services/repositories/room.type.repository";

@Component({
  selector: 'index-rooms-page',
  templateUrl: 'index.rooms.page.html',
  styleUrls: ['../../../../common.styles/data.scss', '../../../../common.styles/entity-map.scss'],
})
export class IndexRoomsPage implements OnInit, OnDestroy {
  public ready = false;
  public langSubscription: Subscription = null;
  public authSubscription: Subscription = null;
  public fl: Floor[] = [];
  public types: RoomType[] = [];
  public currentFloor: Floor = null;
  public places: ICoord[] = [];
  public createPanelActive = false;
  public roomNew: Room = null;
  public roomDeleteId: number = null;
  public roomDeleteConfirmActive = false;
  public roomDeleteConfirmMsg = '';
  public roomQr: Room = null;
  public roomQrPanelActive = false;
  public currentFloorId: number = null;
  public qrActive = false;
  public qrTimestamp = new Date().getTime()

  constructor(
    private appService: AppService,
    private wordRepository: WordRepository,
    private floorRepository: FloorRepository,
    private indexAllOrdersService: IndexAllOrdersService,
    private authService: AuthService,
    private router: Router,
    private roomTypeRepository: RoomTypeRepository,
  ) {
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  get employee(): Employee {
    return this.authService.authData.value.employee;
  }

  get restaurantId(): number {
    return this.employee.restaurant_id;
  }

  public async ngOnInit(): Promise<void> {
    this.initTitle();
    this.initAuthCheck();
    await this.initFloors();
    this.initCurrentFloor();
    this.initPlaces();
    await this.initTypes();
  }
  public async initTypes(): Promise<void> {
    this.types = await this.roomTypeRepository.loadAll();
  }

  public ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  private initTitle(): void {
    this.appService.setTitle(this.words['restorator-floors']['rooms-title'][this.currentLang.slug]);
    this.langSubscription = this.appService.currentLang.subscribe(lang => {
        this.appService.setTitle(this.words['restorator-floors']['rooms-title'][lang.slug]);
      }
    );
  }

  private initAuthCheck(): void {
    this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl('/') : null);
  }

  private async initFloors(): Promise<void> {
    try {
      this.fl = await this.floorRepository.loadAll('number', 1, {restaurant_id: this.restaurantId});
    } catch (err) {
      this.appService.showError(err);
    }
  }

  private initCurrentFloor(): void {
    if (!this.currentFloorId) {
      this.currentFloorId = this.fl[0].id;
      this.currentFloor = this.fl[0];
    } else {
      const temp = this.fl.find(f => f.id === this.currentFloorId);

      if (temp) {
        this.currentFloor = temp;
      } else {
        this.currentFloorId = this.fl[0].id;
        this.currentFloor = this.fl[0];
      }
    }
  }

  private initPlaces(): void {
    this.places = [];

    for (let i = 0; i < this.currentFloor.ny; i++) {
      for (let j = 0; j < this.currentFloor.nx; j++) {
        this.places.push({x: j, y: i});
      }
    }
  }

  public currentFloorSet(item: Floor): void {
    this.currentFloorId = item.id;
    this.currentFloor = item;
    this.initPlaces();
  }

  public roomGet(place: ICoord): Room {
    return this.currentFloor.rooms.find(r => r.x === place.x && r.y === place.y);
  }

  public async onDrop(event: CdkDragDrop<any>, place: ICoord): Promise<void> {
    try {
      const id: number = event.item.data;

      if (id) {
        const room = this.currentFloor.rooms.find(r => r.id === id);
        room.x = place.x;
        room.y = place.y;
      } else {
        this.roomNew.x = place.x;
        this.roomNew.y = place.y;
        this.currentFloor.rooms.push(this.roomNew);
        this.roomNew = null;
      }

      this.currentFloor = await this.floorRepository.update(this.currentFloor);
    } catch (err) {
      this.appService.showError(err);
    }
  }

  public canDrop(place: ICoord): any {
    return (drag: CdkDrag, drop: CdkDropList) => !this.roomGet(place);
  }

  public cantDrop(drag: CdkDrag, drop: CdkDropList): boolean {
    return false;
  }

  public onDelete(item: Room): void {
    this.roomDeleteId = item.id;
    this.roomDeleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} ${this.words['restorator-floors'].rooms[this.currentLang.slug]} #${item.no}?`;
    this.roomDeleteConfirmActive = true;
  }

  public async remove(): Promise<void> {
    try {
      this.roomDeleteConfirmActive = false;
      const index = this.currentFloor.rooms.findIndex(t => t.id === this.roomDeleteId);
      this.currentFloor.rooms.splice(index, 1);
      this.floorRepository.update(this.currentFloor);
    } catch (err) {
      this.appService.showError(err);
    }
  }

  public onQr(item: Room): void {
    this.roomQr = item;
    this.roomQrPanelActive = true;
  }

  public onHistory(item: Room): void {
    this.indexAllOrdersService.filterFloorId = this.currentFloorId;
    this.indexAllOrdersService.filterRoomId = item.id;
    this.indexAllOrdersService.filterCreatedAt = [null, null];
    this.indexAllOrdersService.filterEmployeeId = null;
    this.indexAllOrdersService.filterStatus = null;
    this.router.navigateByUrl('/orders/all');
  }

  public onQRUpdate() {
    this.qrTimestamp = new Date().getTime()
  }

  public openQR() {
    this.qrActive = true
  }
}
