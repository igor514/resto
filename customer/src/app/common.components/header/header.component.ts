import {AfterViewInit, Component, Injector} from "@angular/core";
import { AppService } from "src/app/services/app.service";
import {RouteInjector} from "../route-injector/route-injector";

@Component({
    selector: "the-header",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.scss"],
})
export class HeaderComponent extends RouteInjector implements AfterViewInit {
    public scrollWidth: number = 0;

    constructor(
        protected injector: Injector,
        private appService: AppService,
    ) {
      super(injector);
    }

    get title(): string {return this.appService.headTitle;}
    get backLink(): string {return this.appService.headBackLink;}
    get cartHighlight(): boolean {return this.appService.headCartHighlight;}
    get cartQ(): number {return this.orderService.cartQ;}
    set cartPanelActive(v: boolean) {this.appService.cartPanelActive = v;}

    public async ngAfterViewInit(): Promise<void> {
        await this.appService.pause(1);
        this.scrollWidth = this.appService.win.offsetWidth - this.appService.win.clientWidth;
    }
}
