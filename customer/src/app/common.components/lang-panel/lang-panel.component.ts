import { Component } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { GTService } from "src/app/services/gt.service";

@Component({
    selector: "lang-panel",
    templateUrl: "lang-panel.component.html",
    styleUrls: ["lang-panel.component.scss"],
})
export class LangPanelComponent {
    constructor(
        private appService: AppService,
        private gtService: GTService,
    ) {}

    get active(): boolean {return this.appService.langPanelActive;}
    set active(v: boolean) {this.appService.langPanelActive = v;}
    get gtCurrentLang(): string {return this.gtService.currentLang;}

    public gtTranslate(lang: string): void {
        this.gtService.translate(lang);
    }
}
