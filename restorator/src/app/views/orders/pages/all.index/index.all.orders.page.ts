import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Order, OrderStatus } from "src/app/model/orm/order.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderRepository } from "src/app/services/repositories/order.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { HallRepository } from "src/app/services/repositories/hall.repository";
import { Hall } from "src/app/model/orm/hall.model";
import { Table } from "src/app/model/orm/table.model";
import { EmployeeRepository } from "src/app/services/repositories/employee.repository";
import { Employee } from "src/app/model/orm/employee.model";
import { IChunk } from "src/app/model/chunk.interface";
import { IndexAllOrdersService } from "./index.all.orders.service";
import {FloorRepository} from "../../../../services/repositories/floor.repository";
import {Floor} from "../../../../model/orm/floor.model";
import {Room} from "../../../../model/orm/room.model";

@Component({
    selector: "index-all-orders-page",
    templateUrl: "index.all.orders.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class IndexAllOrdersPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public olChunk: IChunk<Order> = null;
    public olLoading: boolean = false;
    public olSortingVariants: any[][] = // для мобильной верстки
        [["created_at", 1], ["created_at", -1], ["sum", 1], ["sum", -1]];
    public olDeleteConfirmActive: boolean = false;
    public olDeleteConfirmMsg: string = "";
    public olDeleteId: number = null;
    public olCancelId: number = null;
    public olCancelConfirmActive: boolean = false;
    public olCancelConfirmMsg: string = "";
    public olCompleteId: number = null;
    public olCompleteConfirmActive: boolean = false;
    public olCompleteConfirmMsg: string = "";
    public olActivateId: number = null;
    public olActivateConfirmActive: boolean = false;
    public olActivateConfirmMsg: string = "";
    public el: Employee[] = [];
    public hl: Hall[] = [];
    public fl: Floor[] = [];
    public statusActive: OrderStatus = OrderStatus.Active;
    public statusCompleted: OrderStatus = OrderStatus.Completed;
    public statusCancelled: OrderStatus = OrderStatus.Cancelled;

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private orderRepository: OrderRepository,
        private hallRepository: HallRepository,
        private floorRepository: FloorRepository,
        private employeeRepository: EmployeeRepository,
        private authService: AuthService,
        private listService: IndexAllOrdersService,
        private router: Router,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;}
    get restaurantId(): number {return this.employee.restaurant_id;}
    get ol(): Order[] {return this.olChunk.data;}
    get olSum(): number {return this.olChunk.sum;}
    get olAllLength(): number {return this.olChunk.allLength;}
    get olLength(): number {return this.orderRepository.chunkLength;}
    get olCurrentPart(): number {return this.listService.currentPart;}
    set olCurrentPart(v: number) {this.listService.currentPart = v;}
    get olSortBy(): string {return this.listService.sortBy;}
    set olSortBy(v: string) {this.listService.sortBy = v;}
    get olSortDir(): number {return this.listService.sortDir;}
    set olSortDir(v: number) {this.listService.sortDir = v;}
    get olFilterRoomId(): number {return this.listService.filterRoomId;}
    set olFilterRoomId(v: number) {this.listService.filterRoomId = v;}
    get olFilterFloorId(): number {return this.listService.filterFloorId;}
    set olFilterFloorId(v: number) {this.listService.filterFloorId = v;}
    get olFilterCreatedAt(): Date[] {return this.listService.filterCreatedAt;}
    set olFilterCreatedAt(v: Date[]) {this.listService.filterCreatedAt = v;}
    get olFilterHallId(): number {return this.listService.filterHallId;}
    set olFilterHallId(v: number) {this.listService.filterHallId = v;}
    get olFilterTableId(): number {return this.listService.filterTableId;}
    set olFilterTableId(v: number) {this.listService.filterTableId = v;}
    get olFilterEmployeeId(): number {return this.listService.filterEmployeeId;}
    set olFilterEmployeeId(v: number) {this.listService.filterEmployeeId = v;}
    get olFilterStatus(): OrderStatus {return this.listService.filterStatus;}
    set olFilterStatus(v: OrderStatus) {this.listService.filterStatus = v;}
    get olFilter(): any {return {
        restaurant_id: this.restaurantId,
        floor_id: this.olFilterFloorId,
        room_id: this.olFilterRoomId,
        hall_id: this.olFilterHallId,
        table_id: this.olFilterTableId,
        employee_id: this.olFilterEmployeeId,
        created_at: this.olFilterCreatedAt,
        status: this.olFilterStatus,
    };}
    get tl(): Table[] {return this.hl.find(h => h.id === this.olFilterHallId)?.tables || [];}
    get rm(): Room[] {return this.fl.find(f => f.id === this.olFilterFloorId)?.rooms || [];}

    public ngOnInit(): void {
        this.initTitle();
        this.initAuthCheck();
        this.initHalls();
        this.initEmployees();
        this.initOrders();
        this.initFloors();
    }

  private async initFloors(): Promise<void> {
    try {
      this.fl = await this.floorRepository.loadAll("number", 1, {restaurant_id: this.restaurantId});
    } catch (err) {
      this.appService.showError(err);
    }
  }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-all-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-all-index"][lang.slug]));
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    public async initOrders(): Promise<void> {
        try {
            this.olLoading = true;
            this.olChunk = await this.orderRepository.loadChunk(this.olCurrentPart, this.olSortBy, this.olSortDir, this.olFilter);

            if (this.olCurrentPart > 0 && this.olCurrentPart > Math.ceil(this.olAllLength / this.olLength) - 1) { // after deleting or filtering may be currentPart is out of possible diapason, then decrease and reload again
                this.olCurrentPart = 0;
                this.initOrders();
            } else {
                await this.appService.pause(500);
                this.olLoading = false;
            }
        } catch (err) {
            this.appService.showError(err);
        }
    }

    private async initHalls(): Promise<void> {
        try {
            this.hl = await this.hallRepository.loadAll("pos", 1, {restaurant_id: this.restaurantId});
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public async initEmployees(): Promise<void> {
        try {
            this.el = await this.employeeRepository.loadAll("name", 1, {restaurant_id: this.restaurantId});
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.olSortBy === sortBy) {
            this.olSortDir *= -1;
        } else {
            this.olSortBy = sortBy;
            this.olSortDir = 1;
        }

        this.initOrders();
    }

    public setSorting(i: string): void {
        let sorting = this.olSortingVariants[parseInt(i)];
        this.olSortBy = sorting[0];
        this.olSortDir = sorting[1];
        this.initOrders();
    }

    public getStatusName(status: OrderStatus): string {
        return this.words["restorator-orders"][`status-${status}`][this.currentLang.slug];
    }

    public olOnDelete(o: Order): void {
        this.olDeleteId = o.id;
        this.olDeleteConfirmMsg = `${this.words['restorator-orders']['confirm-delete'][this.currentLang.slug]} ${o.id}?`;
        this.olDeleteConfirmActive = true;
    }

    public async olDelete(): Promise<void> {
        try {
            this.olDeleteConfirmActive = false;
            this.olLoading = true;
            await this.orderRepository.delete(this.olDeleteId);
            this.initOrders();
        } catch (err) {
            this.appService.showError(err);
            this.olLoading = false;
        }
    }

    public olOnCancel(o: Order): void {
        this.olCancelId = o.id;
        this.olCancelConfirmMsg = `${this.words['restorator-orders']['confirm-cancel2'][this.currentLang.slug]} ${o.id}?`;
        this.olCancelConfirmActive = true;
    }

    public async olCancel(): Promise<void> {
        try {
            this.olCancelConfirmActive = false;
            this.olLoading = true;
            await this.orderRepository.cancel(this.olCancelId);
            this.initOrders();
        } catch (err) {
            this.appService.showError(err);
            this.olLoading = false;
        }
    }

    public olOnComplete(o: Order): void {
        this.olCompleteId = o.id;
        this.olCompleteConfirmMsg = `${this.words['restorator-orders']['confirm-complete2'][this.currentLang.slug]} ${o.id}?`;
        this.olCompleteConfirmActive = true;
    }

    public async olComplete(): Promise<void> {
        try {
            this.olCompleteConfirmActive = false;
            this.olLoading = true;
            await this.orderRepository.complete(this.olCompleteId);
            this.initOrders();
        } catch (err) {
            this.appService.showError(err);
            this.olLoading = false;
        }
    }

    public olOnActivate(o: Order): void {
        this.olActivateId = o.id;
        this.olActivateConfirmMsg = `${this.words['restorator-orders']['confirm-activate'][this.currentLang.slug]} ${o.id}?`;
        this.olActivateConfirmActive = true;
    }

    public async olActivate(): Promise<void> {
        try {
            this.olActivateConfirmActive = false;
            this.olLoading = true;
            await this.orderRepository.activate(this.olActivateId);
            this.initOrders();
        } catch (err) {
            this.appService.showError(err);
            this.olLoading = false;
        }
    }

    public olExport(): void {
        this.orderRepository.export(this.currentLang.id, "created_at", -1, this.olFilter);
    }
}
