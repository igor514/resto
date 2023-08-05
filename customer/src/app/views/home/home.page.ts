import {Component, Inject, Injector, OnInit} from "@angular/core";
import { ICat } from "src/app/model/orm/cat.interface";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { CatRepository } from "src/app/services/repositories/cat.repository";
import { WordRepository } from "src/app/services/repositories/word.repository";
import {RouteInjector} from "../../common.components/route-injector/route-injector";
import {STATIC_TOKEN} from "../../tokens";

@Component({
    selector: "home-page",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage extends RouteInjector implements OnInit {
    constructor(
        @Inject(STATIC_TOKEN) protected staticPath: string,
        private appService: AppService,
        private wordRepository: WordRepository,
        private catRepository: CatRepository,
        protected injector: Injector,
    ) {
      super(injector);
    }

    get words(): Words {return this.wordRepository.words;}
    get cl(): ICat[] {return this.catRepository.xlAll;}
    get target() {return this.orderService.target;}

    public ngOnInit(): void {
        this.initIface();
        this.initCats();
    }

    private initIface(): void {
        this.appService.headBackLink = null;
        this.appService.setTitle(this.words['customer-home']['title']);
    }

    private async initCats(): Promise<void> {
        try {
            this.catRepository.filterRestaurantId = this.target.restaurant_id;
            this.catRepository.loadAll();
        } catch (err) {
            this.appService.showError(err);
        }
    }
}
