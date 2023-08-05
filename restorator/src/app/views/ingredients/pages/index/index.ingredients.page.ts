import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IChunk } from "src/app/model/chunk.interface";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { IndexIngredientsService } from "./index.ingredients.service";
import {IngredientTypeRepository} from "../../../../services/repositories/ingredient.type.repository";
import {IngredientType} from "../../../../model/orm/ingredient.type.model";

@Component({
    selector: "index-ingredients-page",
    templateUrl: "index.ingredients.page.html",
    styleUrls: ["../../../../common.styles/data.scss"]
})
export class IndexIngredientsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public chunk: IChunk<IngredientType> = null;
    public isLoading: boolean = false;
    public sortingVariants: any[][] = // для мобильной верстки
        [["name", 1], ["name", -1]];
    public deleteConfirmActive: boolean = false;
    public deleteConfirmMsg: string = "";
    private deleteId: number = null;

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private typeRepository: IngredientTypeRepository,
        private authService: AuthService,
        private listService: IndexIngredientsService,
        private router: Router,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;}
    get restaurantId(): number {return this.employee.restaurant_id;}
    get ig(): IngredientType[] {return this.chunk.data;}
    get allLength(): number {return this.chunk.allLength;}
    get length(): number {return this.typeRepository.chunkLength;}
    get currentPart(): number {return this.listService.currentPart;}
    set currentPart(v: number) {this.listService.currentPart = v;}
    get sortBy(): string {return this.listService.sortBy;}
    set sortBy(v: string) {this.listService.sortBy = v;}
    get sortDir(): number {return this.listService.sortDir;}
    set sortDir(v: number) {this.listService.sortDir = v;}
    get filter(): any {return {restaurant_id: this.restaurantId};}

    public async ngOnInit(): Promise<void> {
        this.initTitle();
        this.initAuthCheck();
        this.initIngredients();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-ingr-units"]["title-ingr-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-ingr-units"]["title-ingr-index"][lang.slug]));
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    public async initIngredients(): Promise<void> {
        try {
            this.isLoading = true;
            this.chunk =  await this.typeRepository.loadChunk(this.currentPart, this.sortBy, this.sortDir, this.filter);

            if (this.currentPart > 0 && this.currentPart > Math.ceil(this.allLength / this.length) - 1) { // after deleting or filtering may be currentPart is out of possible diapason, then decrease and reload again
                this.currentPart = 0;
                this.initIngredients();
            } else {
                await this.appService.pause(500);
                this.isLoading = false;
            }
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.sortBy === sortBy) {
            this.sortDir *= -1;
        } else {
            this.sortBy = sortBy;
            this.sortDir = 1;
        }

        this.initIngredients();
    }

    public setSorting(i: string): void {
        let sorting = this.sortingVariants[parseInt(i)];
        this.sortBy = sorting[0];
        this.sortDir = sorting[1];
        this.initIngredients();
    }

    public onDelete(ig: IngredientType): void {
        this.deleteId = ig.id;
        this.deleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${ig.name}"?`;
        this.deleteConfirmActive = true;
    }

    public async delete(): Promise<void> {
        try {
            this.deleteConfirmActive = false;
            this.isLoading = true;
            await this.typeRepository.delete(this.deleteId);
            this.initIngredients();
        } catch (err) {
            this.appService.showError(err);
            this.isLoading = false;
        }
    }

    public async updateParam (id: number, p: string, v: any): Promise<void> {
        try {
            await this.typeRepository.updateParam(id, p, v);
        } catch (err) {
            this.appService.showError(err);
        }
    }
}
