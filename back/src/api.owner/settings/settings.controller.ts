import { Controller, Post, Body } from "@nestjs/common";

import { IAnswer } from 'src/model/dto/answer.interface';
import { SettingsService } from "./settings.service";
import { Settings } from "src/model/settings.type";

@Controller('owner/settings')
export class SettingsController {
    constructor (private settingsService: SettingsService) {}
    
    // get all    
    @Post("all")
    public all(): Promise<IAnswer<Settings>> {
        return this.settingsService.all();
    }    
}
