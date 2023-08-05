import {Component, Injector, OnInit} from "@angular/core";
import { AppService } from "src/app/services/app.service";
import {RouteInjector} from "../../../common.components/route-injector/route-injector";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "notfound-errors-page",
    templateUrl: "notfound.errors.page.html",
})
export class NotfoundErrorsPage extends RouteInjector implements OnInit {
    constructor(
        private appService: AppService,
        protected injector: Injector,
    ) {
      super(injector);
    }

    get target() {return this.orderService.target;}

    public ngOnInit(): void {
        this.appService.setTitle("404");
        this.appService.headBackLink = `/${this.orderService.category}/${this.target.code}`;
    }
}
