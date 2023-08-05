import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Employee } from "src/app/model/orm/employee.model";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order } from "src/app/model/orm/order.model";
import { IServing } from "src/app/model/orm/serving.interface";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { EmployeeRepository } from "src/app/services/repositories/employee.repository";
import { HallRepository } from "src/app/services/repositories/hall.repository";
import { OrderRepository } from "src/app/services/repositories/order.repository";
import { ServingRepository } from "src/app/services/repositories/serving.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import {FloorRepository} from "../../../../services/repositories/floor.repository";
import {Floor} from "../../../../model/orm/floor.model";

@Component({
    selector: "edit-all-orders-page",
    templateUrl: "edit.all.orders.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class EditAllOrdersPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public formLoading: boolean = false;
    public order: Order = null;
    public el: Employee[] = [];
    public hl: Hall[] = [];
    public sl: IServing[] = [];
    public fl: Floor[] = [];
    public cmdSave: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private orderRepository: OrderRepository,
        private hallRepository: HallRepository,
        private employeeRepository: EmployeeRepository,
        private servingRepository: ServingRepository,
        private floorRepository: FloorRepository,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;}
    get restaurantId(): number {return this.employee.restaurant_id;}

    public ngOnInit(): void {
        this.initAuthCheck();
        this.initTitle();
        this.initOrder();
        this.initHalls();
        this.initServings();
        this.initEmployees();
        this.initFloors();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-all-edit"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-all-edit"][lang.slug]));
    }

    private async initOrder(): Promise<void> {
        try {
            this.order = await this.orderRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
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

    private async initServings(): Promise<void> {
        try {
            this.sl = await this.servingRepository.loadAll();
        } catch (err) {
            this.appService.showError(err);
        }
    }

    private async initFloors(): Promise<void> {
      try {
        this.fl = await this.floorRepository.loadAll();
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

    public async complete(): Promise<void> {
        try {
            this.formLoading = true;
            await this.orderRepository.complete(this.order.id);
            this.formLoading = false;
            this.router.navigateByUrl("/orders/all");
        } catch (err) {
            this.appService.showError(err);
            this.formLoading = false;
        }
    }

    public async update(): Promise<void> {
        try {
            this.formLoading = true;
            await this.orderRepository.update(this.order);
            this.formLoading = false;
            this.router.navigateByUrl("/orders/all");
        } catch (err) {
            this.appService.showError(err);
            this.formLoading = false;
        }
    }
}
