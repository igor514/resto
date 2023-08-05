import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Cat } from "src/app/model/orm/cat.model";
import {Icon, IconType} from "src/app/model/orm/icon.model";
import { Lang } from "src/app/model/orm/lang.model";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { CatRepository } from "src/app/services/repositories/cat.repository";
import { IconRepository } from "src/app/services/repositories/icon.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";

@Component({
    selector: "edit-cats-page",
    templateUrl: "edit.cats.page.html",
    styleUrls: ["../../../../common.styles/data.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class EditCatsPage implements OnInit, OnDestroy {
    public langSubscription: Subscription = null;
    public authSubscription: Subscription = null;
    public cat: Cat = null;
    public il: Icon[] = [];
    public formLoading: boolean = false;
    public cmdSave: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private appService: AppService,
        private wordRepository: WordRepository,
        private catRepository: CatRepository,
        private iconRepository: IconRepository,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public ngOnInit(): void {
        this.initTitle();
        this.initAuthCheck();
        this.initCat();
        this.initIcons();
    }

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    }

    private initTitle(): void {
        this.appService.setTitle(this.words["restorator-cats"]["title-edit"][this.currentLang.slug]);
        this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["restorator-cats"]["title-edit"][lang.slug]));
    }

    private initAuthCheck(): void {
        this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl("/") : null);
    }

    private async initCat(): Promise<void> {
        try {
            this.cat = await this.catRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
        } catch (err) {
            this.appService.showError(err);
        }
    }

    private async initIcons(): Promise<void> {
        try {
            this.il = await this.iconRepository.loadAll("pos", 1,{type: IconType.Category});
        } catch (err) {
            this.appService.showError(err);
        }
    }

    public async update(): Promise<void> {
        try {
            this.formLoading = true;
            await this.catRepository.update(this.cat);
            this.formLoading = false;
            this.router.navigateByUrl("/kitchen/cats");
        } catch (err) {
            this.formLoading = false;
            this.appService.showError(err);
        }
    }
}
