import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";
import {IngredientTypeRepository} from "../../../../services/repositories/ingredient.type.repository";
import {IngredientType} from "../../../../model/orm/ingredient.type.model";
import {Unit} from "../../../../model/orm/unit.model";
import {UnitRepository} from "../../../../services/repositories/unit.repository";

@Component({
    selector: "edit-ig-page",
    templateUrl: "edit.ingredients.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class EditIngredientsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public ig: IngredientType = null;
    public formLoading = false;
    public cmdSave: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private typeRepository: IngredientTypeRepository,
        private unitRepository: UnitRepository,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {
        this.initTitle();
        this.initAuthCheck();
        this.initIngredient();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-ingr-units"]["title-ingr-edit"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-ingr-units"]["title-ingr-edit"][lang.slug]));
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private async initIngredient(): Promise<void> {
        try {
            this.ig = await this.typeRepository.one(parseInt(this.route.snapshot.params["id"]));
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public async update(): Promise<void> {
        try {
            this.formLoading = true;
            await this.typeRepository.update(this.ig);
            this.formLoading = false;
            this.router.navigateByUrl("/kitchen/ingredients");
        } catch (err) {
            this.formLoading = false;
            this.appService.showError(err);
        }
    }
}
