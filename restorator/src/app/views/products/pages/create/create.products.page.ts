import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Product } from "src/app/model/orm/product.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { ProductRepository } from "src/app/services/repositories/product.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "create-products-page",
    templateUrl: "create.products.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CreateProductsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public product: Product = null;
    public formLoading: boolean = false; 
    public cmdSave: BehaviorSubject<boolean> = new BehaviorSubject(false);  

    constructor(
        private appService: AppService,        
        private wordRepository: WordRepository,    
        private productRepository: ProductRepository,           
        private authService: AuthService,       
        private route: ActivatedRoute,  
        private router: Router,      
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}    

    public ngOnInit(): void {        
        this.initTitle();  
        this.initAuthCheck();      
        this.initProduct();                
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-products"]["title-create"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-products"]["title-create"][lang.slug]));           
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private async initProduct(): Promise<void> {
        try {
            const restaurant_id = this.authService.authData.value.employee.restaurant_id;
            const cat_id = parseInt(this.route.snapshot.params["cat_id"]);
            this.product = new Product().init(restaurant_id, cat_id);
        } catch (err) {
            this.appService.showError(err);
        }        
    }    

    public async create(): Promise<void> {
        try {                     
            this.formLoading = true;            
            await this.productRepository.create(this.product);
            this.formLoading = false;            
            this.router.navigateByUrl("/kitchen/products");            
        } catch (err) {
            this.formLoading = false;
            this.appService.showError(err);
        }
    }    
}