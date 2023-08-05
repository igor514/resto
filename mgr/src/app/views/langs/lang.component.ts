import {Component, Inject, Input} from '@angular/core';

import {Lang} from 'src/app/model/orm/lang.model';
import {ObjectComponent} from '../_object.component';
import {STATIC_TOKEN} from "../../tokens";
import {AdmLangRepository} from "../../services/repositories/admlang.repository";
import {AppService} from "../../services/app.service";
import {FilesService} from "../../services/files.service";

@Component({
  selector: "the-lang",
  templateUrl: "./lang.component.html"
})
export class LangComponent extends ObjectComponent<Lang> {
  public imgFolder: string = "langs";
  public imgDisk: string = "langs";
  public imgResizeWidth: number[] = [100];

  constructor(
    @Inject(STATIC_TOKEN) protected staticPath: string,
    protected admlangRepository: AdmLangRepository,
    protected appService?: AppService,
    protected filesService?: FilesService,
  ) {
    super(admlangRepository, appService, filesService);
  }
}
