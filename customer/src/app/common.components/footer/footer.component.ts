import {AfterViewInit, Component, Injector} from "@angular/core";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { WordRepository } from "src/app/services/repositories/word.repository";
import {RouteInjector} from "../route-injector/route-injector";

@Component({
    selector: "the-footer",
    templateUrl: "footer.component.html",
    styleUrls: ["footer.component.scss"],
})
export class FooterComponent extends RouteInjector implements AfterViewInit {
    public scrollWidth: number = 0;
    public waiterConfirmPanelActive: boolean = false;
    public waiterAlertPanelActive: boolean = false;

    constructor(
        protected injector: Injector,
        private appService: AppService,
        private wordRepository: WordRepository,
    ) {
      super(injector);
    }

    get words(): Words {return this.wordRepository.words;}
    set invoicePanelActive(v: boolean) {this.appService.invoicePanelActive = v;}

    public async ngAfterViewInit(): Promise<void> {
        await this.appService.pause(1);
        this.scrollWidth = this.appService.win.offsetWidth - this.appService.win.clientWidth;
    }

    public onWaiterCall(): void {
        this.waiterConfirmPanelActive = true;
    }

    public async waiterCall(): Promise<void> {
        try {
            this.waiterConfirmPanelActive = false;
            await this.appService.pause(300);
            await this.orderService.callWaiter();
            this.waiterAlertPanelActive = true;
            await this.appService.pause(3000);
            this.waiterAlertPanelActive = false;
        } catch (err) {
            this.appService.showError(err);
        }
    }
}
