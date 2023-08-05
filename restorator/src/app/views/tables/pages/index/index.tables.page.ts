import { CdkDrag, CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ICoord } from "src/app/model/coord.interface";
import { Employee } from "src/app/model/orm/employee.model";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Table } from "src/app/model/orm/table.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { HallRepository } from "src/app/services/repositories/hall.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { IndexAllOrdersService } from "src/app/views/orders/pages/all.index/index.all.orders.service";
import { IndexTableService } from "./index.tables.service";

@Component({
    selector: "index-tables-page",
    templateUrl: "index.tables.page.html",
    styleUrls: ["../../../../common.styles/entity-map.scss", "../../../../common.styles/data.scss"],
})
export class IndexTablesPage implements OnInit, OnDestroy {
    public ready: boolean = false;
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public hl: Hall[] = [];
    public currentHall: Hall = null;
    public places: ICoord[] = [];
    public tableCreatePanelActive: boolean = false;
    public tableNew: Table = null;
    public tableDeleteId: number = null;
    public tableDeleteConfirmActive: boolean = false;
    public tableDeleteConfirmMsg: string = "";
    public tableQr: Table = null;
    public tableQrPanelActive: boolean = false;
    public qrActive: boolean = false;

    // used as search param to invalidate urls and load updated qrs
    public qrTimestamp = new Date().getTime();

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private hallRepository: HallRepository,
        private indexAllOrdersService: IndexAllOrdersService,
        private authService: AuthService,
        private listService: IndexTableService,
        private router: Router,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;}
    get restaurantId(): number {return this.employee.restaurant_id;}
    get currentHallId(): number {return this.listService.currentHallId;}
    set currentHallId(v: number) {this.listService.currentHallId = v;}

    public async ngOnInit(): Promise<void> {
        this.initTitle();
        this.initAuthCheck();
        await this.initHalls();
        this.initCurrentHall();
        this.initPlaces();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-tables"]["title"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-tables"]["title"][lang.slug]));
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private async initHalls(): Promise<void> {
        try {
            this.hl = await this.hallRepository.loadAll("pos", 1, {restaurant_id: this.restaurantId});
        } catch (err) {
            this.appService.showError(err);
        }
    }

    private initCurrentHall(): void {
        if (!this.currentHallId) {
            this.currentHallId = this.hl[0].id;
            this.currentHall = this.hl[0];
        } else {
            let temp = this.hl.find(h => h.id === this.currentHallId);

            if (temp) {
                this.currentHall = temp;
            } else {
                this.currentHallId = this.hl[0].id;
                this.currentHall = this.hl[0];
            }
        }
    }

    private initPlaces(): void {
        this.places = [];

        for (let i = 0; i < this.currentHall.ny; i++) {
            for (let j = 0; j < this.currentHall.nx; j++) {
                this.places.push({x: j, y: i});
            }
        }
    }

    public currentHallSet(hall: Hall): void {
        this.currentHallId = hall.id;
        this.currentHall = hall;
        this.initPlaces();
    }

    public tableGet(place: ICoord): Table {
        return this.currentHall.tables.find(t => t.x === place.x && t.y === place.y);
    }

    public async tableOnDrop(event: CdkDragDrop<any>, place: ICoord): Promise<void> {
        try {
            const tableId: number = event.item.data;

            if (tableId) {
                const table: Table = this.currentHall.tables.find(t => t.id === tableId);
                table.x = place.x;
                table.y = place.y;
            } else {
                this.tableNew.x = place.x;
                this.tableNew.y = place.y;
                this.currentHall.tables.push(this.tableNew);
                this.tableNew = null;
            }

            this.currentHall = await this.hallRepository.update(this.currentHall);
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public tableCanDrop(place: ICoord): any {
        return (drag: CdkDrag, drop: CdkDropList) => !this.tableGet(place);
    }

    public tableCantDrop(drag: CdkDrag, drop: CdkDropList): boolean {
        return false;
    }

    public tableOnDelete(t: Table): void {
        this.tableDeleteId = t.id;
        this.tableDeleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} ${this.words['restorator-tables']['table'][this.currentLang.slug]} #${t.no}?`;
        this.tableDeleteConfirmActive = true;
    }

    public async tableDelete(): Promise<void> {
        try {
            this.tableDeleteConfirmActive = false;
            let index = this.currentHall.tables.findIndex(t => t.id === this.tableDeleteId);
            this.currentHall.tables.splice(index, 1);
            this.hallRepository.update(this.currentHall);
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public tableOnQr(t: Table): void {
        this.tableQr = t;
        this.tableQrPanelActive = true;
    }

    public tableOnHistory(t: Table): void {
        this.indexAllOrdersService.filterHallId = this.currentHallId;
        this.indexAllOrdersService.filterTableId = t.id;
        this.indexAllOrdersService.filterCreatedAt = [null, null];
        this.indexAllOrdersService.filterEmployeeId = null;
        this.indexAllOrdersService.filterStatus = null;
        this.router.navigateByUrl("/orders/all");
    }

    public openQR() {
      this.qrActive = true;
    }

    public onQRUpdate() {
      this.qrTimestamp = new Date().getTime()
  }
}
