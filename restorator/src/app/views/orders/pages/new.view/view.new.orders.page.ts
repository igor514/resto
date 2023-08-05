import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Socket } from "socket.io-client";
import { IOrderAccepted } from "src/app/model/dto/order.accepted.interface";
import { IOrderNeedProducts } from "src/app/model/dto/order.need.products.interface";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Order, Paymethod } from "src/app/model/orm/order.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { OrderRepository } from "src/app/services/repositories/order.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { SocketService } from "src/app/services/socket.service";

@Component({
    selector: "view-new-orders-page",
    templateUrl: "view.new.orders.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
})
export class ViewNewOrdersPage implements OnInit, OnDestroy {    
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null; 
    private socketSubscription: Subscription = null;    
    public order: Order = null;       
    public employee_comment: string = "";
    public acceptConfirmActive: boolean = false;
    public acceptConflictAlertActive: boolean = false;
    public formLoading: boolean = false;
    public payCash: Paymethod = Paymethod.Cash;
    public payCard: Paymethod = Paymethod.Card;
    
    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,           
        private orderRepository: OrderRepository,
        private authService: AuthService,   
        private socketService: SocketService,           
        private router: Router,    
        private route: ActivatedRoute,  
    ) {}    

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;} 
    get restaurantId(): number {return this.employee.restaurant_id;}
    get currency_symbol(): string {return this.employee.restaurant.currency.symbol;}   
    
    public ngOnInit(): void {       
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
        this.initOrder();   
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
        this.socketService.socket?.off(`accepted-${this.restaurantId}`, this.socketOnAccepted);                
        this.socketService.socket?.off(`deleted-${this.restaurantId}`, this.socketOnDeleted);
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => ad.employee.restaurant.money < 0 ? this.router.navigateByUrl("/") : null);
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-orders"]["title-new-view"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-orders"]["title-new-view"][lang.slug]));           
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
        this.socketService.qNew = 0;        
        this.socketSubscription = this.socketService.socketConnected.subscribe(connected => { // обработчики сообщений вешаются после коннекта!
            if (connected) {                
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

    public onAccept(): void {
        this.acceptConfirmActive = true;
    }

    public async accept(): Promise<void> {
        try {
            this.acceptConfirmActive = false;
            this.formLoading = true;
            const statusCode = await this.orderRepository.accept(this.order.id, this.employee.id, this.employee_comment);
            this.formLoading = false;

            if (statusCode === 200) {
                this.router.navigateByUrl("/orders/my");
            } else if (statusCode === 410) {
                this.acceptConflictAlertActive = true;
            } else {
                this.appService.showError(this.words['common']['error'][this.currentLang.slug]);
            }
        } catch (err) {
            this.appService.showError(err);
        }
    }

    // сообщения сокетов
    private socketOnUpdated(data: Order): void {
        if (data.id === this.order?.id) {
            // при апдейте мы не знаем, привязан этот заказ к сотруднику или нет, поэтому проверяем и либо уходим со страницы, либо заменяем
            data.employee_id ? this.router.navigateByUrl("/orders/new") : this.order = new Order().build(data);
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
        this.order.id === data ? this.router.navigateByUrl("/orders/new") : null;        
    }

    private socketOnCompleted(data: number): void {        
        this.order.id === data ? this.router.navigateByUrl("/orders/new") : null;   
    }

    private socketOnAccepted(data: IOrderAccepted): void {                
        this.order.id === data.order_id && this.employee.id !== data.employee_id ? this.router.navigateByUrl("/orders/new") : null;        
    }

    private socketOnDeleted(data: number): void {                
        this.order.id === data ? this.router.navigateByUrl("/orders/new") : null;             
    }
}
