import {Component, Inject, Input, OnInit} from '@angular/core';

import {Lang} from 'src/app/model/orm/lang.model';
import {Icon, IconType} from 'src/app/model/orm/icon.model';
import {ObjectComponent} from '../_object.component';
import {STATIC_TOKEN} from "../../tokens";
import {AdmLangRepository} from "../../services/repositories/admlang.repository";
import {AppService} from "../../services/app.service";
import {FilesService} from "../../services/files.service";

@Component({
  selector: "the-icon",
  templateUrl: "./icon.component.html"
})
export class IconComponent extends ObjectComponent<Icon> implements OnInit {
  @Input() x: Icon;
  @Input() ll: Lang[] = [];
  public selectedLang: Lang;
  public imgFolder = "icons";
  readonly IconType = IconType;

  constructor(
    @Inject(STATIC_TOKEN) protected staticPath: string,
    protected admlangRepository: AdmLangRepository,
    protected appService?: AppService,
    protected filesService?: FilesService,
  ) {
    super(admlangRepository, appService, filesService);
  }

  public ngOnInit(): void {
    this.selectedLang = this.ll[0];
  }
}
