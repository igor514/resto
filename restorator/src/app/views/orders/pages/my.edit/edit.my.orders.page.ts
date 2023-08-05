import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Socket } from "socket.io-client";
import { IOrderNeedProducts } from "src/app/model/dto/order.need.products.interface";
import { Employee } from "src/app/model/orm/employee.model";
import { Hall } from "src/app/model/orm/hall.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order } from "src/app/model/orm/order.model";
import { IServing } from "src/app/model/orm/serving.interface";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { HallRepository } from "src/app/services/repositories/hall.repository";
import { OrderRepository } from "src/app/services/repositories/order.repository";
import { ServingRepository } from "src/app/services/repositories/serving.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { SocketService } from "src/app/services/socket.service";

@Component({
    selector: "edit-my-orders-page",
    templateUrl: "edit.my.orders.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class EditMyOrdersPage implements OnInit, OnDestroy {    
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;  
    private socketSubscription: Subscription = null;    
    public formLoading: boolean = false;
    public order: Order = null;  
    public hl: Hall[] = [];
    public sl: IServing[] = [];
    public cmdSave: BehaviorSubject<boolean> = new BehaviorSubject(false);
    
    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,           
        private orderRepository: OrderRepository,
        private hallRepository: HallRepository,  
        private servingRepository: ServingRepository,     
        private authService: AuthService,   
        private socketService: SocketService,         
        private router: Router,    
        private route: ActivatedRoute,  
    ) {}    

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}        
    get employee(): Employee {return this.authService.authData.value.employee;} 
    get restaurantId(): number {return this.employee.restaurant_id;}    
    
    public ngOnInit(): void {  
        this.socketOnUpdated = this.socketOnUpdated.bind(this);
        this.socketOnNeedWaiter = this.socketOnNeedWaiter.bind(this);
        this.socketOnNeedInvoice = this.socketOnNeedInvoice.bind(this);
        this.socketOnNeedProducts = this.socketOnNeedProducts.bind(this);
        this.socketOnCancelled = this.socketOnCancelled.bind(this);
        this.socketOnCompleted = this.socketOnCompleted.bind(this);        
        this.socketOnDeleted = this.socketOnDeleted.bind(this);      
        this.initAuthCheck();     
        this.initTitle();          
        this.initOrder();     
        this.initHalls(); 
        this.initServings();
        this.initSocket();   
    }  
    
    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
        this.socketSubscription.unsubscribe();
        this.socketService.socket?.off(`updated-${this.restaurantId}`, this.socketOnUpdated);
        this.socketService.socket?.off(`need-waiter-${this.restaurantId}`, this.socketOnNeedWaiter);
        this.socketService.socket?.off(`need-invoice-${this.restaurantId}`, this.socketOnNeedInvoice);
        this.socketService.socket?.off(`need-products-${this.restaurantId}`, this.socketOnNeedProducts);
        this.socketService.socket?.off(`cancelled-${this.restaurantId}`, this.socketOnCancelled);
        this.socketService.socket?.off(`completed-${this.restaurantId}`, this.socketOnCompleted);        
        this.socketService.socket?.off(`deleted-${this.restaurantId}`, this.socketOnDeleted);
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => ad.employee.restaurant.money < 0 ? this.router.navigateByUrl("/") : null);
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-my-edit"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-my-edit"][lang.slug]));           
    } 

    private async initOrder(): Promise<void> {
        try {
            this.order = await this.orderRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
        } catch (err) {
            this.appService.showError(err);
        }
    }  
    
    private async initSocket(): Promise<void> {        
        await this.appService.pause(1);      
        this.socketService.qMy = 0;
        this.socketSubscription = this.socketService.socketConnected.subscribe(connected => { // обработчики сообщений вешаются после коннекта!
            if (connected) {                
                this.socketService.socket.on(`updated-${this.restaurantId}`, this.socketOnUpdated);
                this.socketService.socket.on(`need-waiter-${this.restaurantId}`, this.socketOnNeedWaiter);                
                this.socketService.socket.on(`need-invoice-${this.restaurantId}`, this.socketOnNeedInvoice);                
                this.socketService.socket.on(`need-products-${this.restaurantId}`, this.socketOnNeedProducts);
                this.socketService.socket.on(`cancelled-${this.restaurantId}`, this.socketOnCancelled);
                this.socketService.socket.on(`completed-${this.restaurantId}`, this.socketOnCompleted);                
                this.socketService.socket.on(`deleted-${this.restaurantId}`, this.socketOnDeleted);
            }
        });         
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

    public async complete(): Promise<void> {
        try {
            this.formLoading = true;
            await this.orderRepository.complete(this.order.id);
            this.formLoading = false;
            this.router.navigateByUrl("/orders/my");
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
            this.router.navigateByUrl("/orders/my");
        } catch (err) {
            this.appService.showError(err);
            this.formLoading = false;
        }
    }

    // сообщения сокетов
    private socketOnUpdated(data: Order): void {
        if (data.id === this.order?.id) {
            // при апдейте мы не знаем, привязан этот заказ к сотруднику или нет, поэтому проверяем и либо уходим со страницы, либо заменяем
            data.employee_id === this.employee.id ? this.order = new Order().build(data) : this.router.navigateByUrl("/orders/my");
        }        
    }
    
    private async socketOnNeedWaiter(data: Order): Promise<void> {        
        if (this.order.id === data.id) {
            this.order.need_waiter = true;
            this.order._highlightNeedWaiter = true;
            await this.appService.pause(3000);
            this.order._highlightNeedWaiter = false;            
        }        
    }

    private async socketOnNeedInvoice(data: Order): Promise<void> {
        if (this.order.id === data.id) {
            this.order.need_invoice = true;
            this.order.paymethod = data.paymethod;
            this.order._highlightNeedInvoice = true;            
            await this.appService.pause(3000);
            this.order._highlightNeedInvoice = false;            
        } 
    }

    private async socketOnNeedProducts(data: IOrderNeedProducts): Promise<void> {
        if (this.order.id === data.order.id) {            
            this.order.need_products = true;
            this.order._highlightNeedProducts = true;
            data.products.forEach(p => {
                p._highlight = true;
                this.order.products.push(p);
            });            
            await this.appService.pause(3000);
            this.order._highlightNeedProducts = false;            
            data.products.forEach(p => p._highlight = false);
        }
    }

    private socketOnCancelled(data: number): void {        
        this.order.id === data ? this.router.navigateByUrl("/orders/my") : null;        
    }

    private socketOnCompleted(data: number): void {        
        this.order.id === data ? this.router.navigateByUrl("/orders/my") : null;   
    }

    private socketOnDeleted(data: number): void {                
        this.order.id === data ? this.router.navigateByUrl("/orders/my") : null;             
    }    
}
