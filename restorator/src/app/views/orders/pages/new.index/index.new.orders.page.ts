import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IOrderAccepted } from "src/app/model/dto/order.accepted.interface";
import { IOrderNeedProducts } from "src/app/model/dto/order.need.products.interface";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order, OrderStatus } from "src/app/model/orm/order.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderRepository } from "src/app/services/repositories/order.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { SocketService } from "src/app/services/socket.service";

@Component({
    selector: "index-new-orders-page",
    templateUrl: "index.new.orders.page.html",
    styleUrls: ["../../styles/orders.scss"],
})
export class IndexNewOrdersPage implements OnInit, OnDestroy {        
    private langSubscription: Subscription = null;
    private authSubscription: Subscription = null;    
    private socketSubscription: Subscription = null;        
    public ol: Order[] = [];    
    public olReady: boolean = false;
    public olOrderCancelId: number = null;
    public olCancelConfirmActive: boolean = false;    
    public olOrderAcceptId: number = null;
    public olAcceptConfirmActive: boolean = false;
    public olAcceptConflictAlertActive: boolean = false;        
    
    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,           
        private orderRepository: OrderRepository,
        private authService: AuthService,    
        private socketService: SocketService,     
        private router: Router,      
    ) {}    

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    
    get employee(): Employee {return this.authService.authData.value.employee;}
    get restaurantId(): number {return this.employee.restaurant_id;}
    get olFilter(): any {return {restaurant_id: this.restaurantId, status: OrderStatus.Active, employee_id: null};}
    
    public ngOnInit(): void {    
        this.socketOnCreated = this.socketOnCreated.bind(this);
        this.socketOnUpdated = this.socketOnUpdated.bind(this);
        this.socketOnNeedWaiter = this.socketOnNeedWaiter.bind(this);
        this.socketOnNeedInvoice = this.socketOnNeedInvoice.bind(this);
        this.socketOnNeedProducts = this.socketOnNeedProducts.bind(this);
        this.socketOnCancelled = this.socketOnCancelled.bind(this);
        this.socketOnCompleted = this.socketOnCompleted.bind(this);
        this.socketOnAccepted = this.socketOnAccepted.bind(this);
        this.socketOnDeleted = this.socketOnDeleted.bind(this);
        this.initAuthCheck();     
        this.initTitle();                  
        this.initSocket();
        this.initOrders();                      
    }  
    
    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
        this.socketSubscription.unsubscribe();
        this.socketService.socket?.off(`created-${this.restaurantId}`, this.socketOnCreated);
        this.socketService.socket?.off(`updated-${this.restaurantId}`, this.socketOnUpdated);
        this.socketService.socket?.off(`need-waiter-${this.restaurantId}`, this.socketOnNeedWaiter);
        this.socketService.socket?.off(`need-invoice-${this.restaurantId}`, this.socketOnNeedInvoice);
        this.socketService.socket?.off(`need-products-${this.restaurantId}`, this.socketOnNeedProducts);
        this.socketService.socket?.off(`cancelled-${this.restaurantId}`, this.socketOnCancelled);
        this.socketService.socket?.off(`completed-${this.restaurantId}`, this.socketOnCompleted);
        this.socketService.socket?.off(`accepted-${this.restaurantId}`, this.socketOnAccepted);
        this.socketService.socket?.off(`deleted-${this.restaurantId}`, this.socketOnDeleted);
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-new-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-new-index"][lang.slug]));           
    }  
    
    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => ad.employee.restaurant.money < 0 ? this.router.navigateByUrl("/") : null);
    }

    private async initOrders(): Promise<void> {
        try {            
            this.ol = await this.orderRepository.loadAll("created_at", -1, this.olFilter);   
            this.olReady = true;             
        } catch (err) {
            this.appService.showError(err);
        }
    }   
    
    private async initSocket(): Promise<void> {        
        await this.appService.pause(1);  
        this.socketService.qNew = 0;
        this.socketSubscription = this.socketService.socketConnected.subscribe(connected => { // обработчики сообщений вешаются после коннекта!
            if (connected) {
                this.socketService.socket.on(`created-${this.restaurantId}`, this.socketOnCreated);
                this.socketService.socket.on(`updated-${this.restaurantId}`, this.socketOnUpdated);
                this.socketService.socket.on(`need-waiter-${this.restaurantId}`, this.socketOnNeedWaiter);                
                this.socketService.socket.on(`need-invoice-${this.restaurantId}`, this.socketOnNeedInvoice);                
                this.socketService.socket.on(`need-products-${this.restaurantId}`, this.socketOnNeedProducts);                
                this.socketService.socket.on(`cancelled-${this.restaurantId}`, this.socketOnCancelled);
                this.socketService.socket.on(`completed-${this.restaurantId}`, this.socketOnCompleted);
                this.socketService.socket.on(`accepted-${this.restaurantId}`, this.socketOnAccepted);
                this.socketService.socket.on(`deleted-${this.restaurantId}`, this.socketOnDeleted);
            }
        });                
    }    
    
    public olOnAccept(o: Order): void {
        this.olOrderAcceptId = o.id;
        this.olAcceptConfirmActive = true;
    }

    public async olAccept(): Promise<void> {
        try {
            this.olAcceptConfirmActive = false;
            const statusCode = await this.orderRepository.accept(this.olOrderAcceptId, this.employee.id);            

            if (statusCode === 200) {                
                this.router.navigateByUrl("/orders/my");
            } else if (statusCode === 410) {
                this.olAcceptConflictAlertActive = true;                
                const index = this.ol.findIndex(o => o.id === this.olOrderAcceptId);
                index !== -1 ? this.ol.splice(index, 1) : null; // на всяк. случай проверяем, потому что заказ может исчезнуть по команде сокета
            } else {
                this.appService.showError(this.words['common']['error'][this.currentLang.slug]);
            }
        } catch (err) {
            this.appService.showError(err);
        }        
    }

    public olOnCancel(o: Order): void {
        this.olOrderCancelId = o.id;
        this.olCancelConfirmActive = true;
    }

    public olCancel(): void {
        try {
            this.olCancelConfirmActive = false;       
            this.orderRepository.cancel(this.olOrderCancelId);            
            const index = this.ol.findIndex(o => o.id === this.olOrderCancelId);
            index !== -1 ? this.ol.splice(index, 1) : null; // на всяк. случай проверяем, потому что заказ может исчезнуть по команде сокета
        } catch (err) {
            this.appService.showError(err);
        }       
    }  
    
    // сообщения сокетов
    private async socketOnCreated(data: Order): Promise<void> {        
        if (!data.employee_id && this.ol.findIndex(o => o.id === data.id) === -1) {
            const order = new Order().build(data);
            order._highlight = true;
            this.ol.unshift(order);
            await this.appService.pause(3000);
            order._highlight = false;        
        }        
    }

    private socketOnUpdated(data: Order): void {
        const index = this.ol.findIndex(o => o.id === data.id);

        if (index !== -1) {            
            data.employee_id ? this.ol.splice(index, 1) : this.ol[index] = new Order().build(data);
        } else {
            this.socketOnCreated(data);
        }       
    }

    private async socketOnNeedWaiter(data: Order): Promise<void> {                
        const order = this.ol.find(o => o.id === data.id);
        
        if (order) {
            order.need_waiter = true;
            order._highlightNeedWaiter = true;
            await this.appService.pause(3000);
            order._highlightNeedWaiter = false;            
        }        
    }

    private async socketOnNeedInvoice(data: Order): Promise<void> {
        const order = this.ol.find(o => o.id === data.id);

        if (order) {
            order.need_invoice = true;
            order._highlightNeedInvoice = true;
            await this.appService.pause(3000);
            order._highlightNeedInvoice = false;            
        } 
    }

    private async socketOnNeedProducts(data: IOrderNeedProducts): Promise<void> {
        const order = this.ol.find(o => o.id === data.order.id);

        if (order) {
            order.need_products = true;
            order.products = [...order.products, ...data.products];
            order._highlightNeedProducts = true;
            await this.appService.pause(3000);
            order._highlightNeedProducts = false;            
        }
    }

    private socketOnCancelled(data: number): void {        
        const index = this.ol.findIndex(o => o.id === data);
        index !== -1 ? this.ol.splice(index, 1) : null;
    }

    private socketOnCompleted(data: number): void {        
        const index = this.ol.findIndex(o => o.id === data);
        index !== -1 ? this.ol.splice(index, 1) : null;
    }

    private socketOnAccepted(data: IOrderAccepted): void {                
        const index = this.ol.findIndex(o => o.id === data.order_id);
        index !== -1 ? this.ol.splice(index, 1) : null;                
    }

    private socketOnDeleted(data: number): void {                
        const index = this.ol.findIndex(o => o.id === data);
        index !== -1 ? this.ol.splice(index, 1) : null;             
    }
}
