import { Component } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
    selector: "error-notification",
    templateUrl: "errornotification.component.html",
    styleUrls: ["errornotification.component.scss"]
})
export class ErrorNotificationComponent {
    constructor(private appService: AppService) {}

    get active(): boolean {return this.appService.errorActive;}
    get message(): string {return this.appService.errorMessage;}

    public reload(): void {
        document.location.href = "/";
    }
}