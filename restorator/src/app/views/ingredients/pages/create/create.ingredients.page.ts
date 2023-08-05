import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";
import {IngredientType} from "../../../../model/orm/ingredient.type.model";
import {IngredientTypeRepository} from "../../../../services/repositories/ingredient.type.repository";
import {UnitRepository} from "../../../../services/repositories/unit.repository";

@Component({
    selector: "create-ingredient-page",
    templateUrl: "create.ingredients.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CreateIngredientsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public ig: IngredientType = null;
    public formLoading = false;
    public cmdSave: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private typeRepository: IngredientTypeRepository,
        private authService: AuthService,
        private unitRepository: UnitRepository,
        private router: Router,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {
        this.initTitle();
        this.initAuthCheck();
        this.initType();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-ingr-units"]["title-ingr-create"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-ingr-units"]["title-ingr-create"][lang.slug]));
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private initType(): void {
        this.ig = new IngredientType().init(this.authService.authData.value.employee.restaurant_id);
    }

    public async create(): Promise<void> {
        try {
            this.formLoading = true;
            await this.typeRepository.create(this.ig);
            this.formLoading = false;
            this.router.navigateByUrl("/kitchen/ingredients");
        } catch (err) {
            this.formLoading = false;
            this.appService.showError(err);
        }
    }
}
