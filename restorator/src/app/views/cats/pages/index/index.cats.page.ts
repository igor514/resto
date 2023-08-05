import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IChunk } from "src/app/model/chunk.interface";
import { Cat } from "src/app/model/orm/cat.model";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { CatRepository } from "src/app/services/repositories/cat.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import { IndexCatsService } from "./index.cats.service";
import {STATIC_TOKEN} from "../../../../tokens";

@Component({
    selector: "index-cats-page",
    templateUrl: "index.cats.page.html",
    styleUrls: ["../../../../common.styles/data.scss"]
})
export class IndexCatsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public clChunk: IChunk<Cat> = null;
    public clLoading: boolean = false;
    public clSortingVariants: any[][] = // для мобильной верстки
        [["name", 1], ["name", -1], ["pos", 1], ["pos", -1]];
    public deleteConfirmActive: boolean = false;
    public deleteConfirmMsg: string = "";
    private deleteId: number = null;

    constructor(
        @Inject(STATIC_TOKEN) protected staticPath: string,
        private appService: AppService,
        private wordRepository: WordRepository,
        private catRepository: CatRepository,
        private authService: AuthService,
        private listService: IndexCatsService,
        private router: Router,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;}
    get restaurantId(): number {return this.employee.restaurant_id;}
    get cl(): Cat[] {return this.clChunk.data;}
    get clAllLength(): number {return this.clChunk.allLength;}
    get clLength(): number {return this.catRepository.chunkLength;}
    get clCurrentPart(): number {return this.listService.currentPart;}
    set clCurrentPart(v: number) {this.listService.currentPart = v;}
    get clSortBy(): string {return this.listService.sortBy;}
    set clSortBy(v: string) {this.listService.sortBy = v;}
    get clSortDir(): number {return this.listService.sortDir;}
    set clSortDir(v: number) {this.listService.sortDir = v;}
    get clFilter(): any {return {restaurant_id: this.restaurantId};}

    public async ngOnInit(): Promise<void> {
        this.initTitle();
        this.initAuthCheck();
        this.initCats();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-cats"]["title-index"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-cats"]["title-index"][lang.slug]));
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    public async initCats(): Promise<void> {
        try {
            this.clLoading = true;
            this.clChunk =  await this.catRepository.loadChunk(this.clCurrentPart, this.clSortBy, this.clSortDir, this.clFilter);

            if (this.clCurrentPart > 0 && this.clCurrentPart > Math.ceil(this.clAllLength / this.clLength) - 1) { // after deleting or filtering may be currentPart is out of possible diapason, then decrease and reload again
                this.clCurrentPart = 0;
                this.initCats();
            } else {
                await this.appService.pause(500);
                this.clLoading = false;
            }
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.clSortBy === sortBy) {
            this.clSortDir *= -1;
        } else {
            this.clSortBy = sortBy;
            this.clSortDir = 1;
        }

        this.initCats();
    }

    public setSorting(i: string): void {
        let sorting = this.clSortingVariants[parseInt(i)];
        this.clSortBy = sorting[0];
        this.clSortDir = sorting[1];
        this.initCats();
    }

    public onDelete(c: Cat): void {
        this.deleteId = c.id;
        this.deleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${c.name}"?`;
        this.deleteConfirmActive = true;
    }

    public async delete(): Promise<void> {
        try {
            this.deleteConfirmActive = false;
            this.clLoading = true;
            await this.catRepository.delete(this.deleteId);
            this.initCats();
        } catch (err) {
            this.appService.showError(err);
            this.clLoading = false;
        }
    }

    public async updateParam (id: number, p: string, v: any): Promise<void> {
        try {
            await this.catRepository.updateParam(id, p, v);
        } catch (err) {
            this.appService.showError(err);
        }
    }
}
