import { Component } from "@angular/core";
import { SettingRepository } from "src/app/services/repositories/setting.repository";

@Component({
    selector: "msg-desktop",
    templateUrl: "msg-desktop.component.html",
    styleUrls: ["msg-desktop.component.scss"],
})
export class MsgDesktopComponent {
    constructor(private settingRepository: SettingRepository) {}
    
    get msg(): string {return this.settingRepository.settings?.["restorator-msg"];}
}