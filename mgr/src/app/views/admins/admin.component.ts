import {Component, Inject, Input} from '@angular/core';

import { Admin } from '../../model/orm/admin.model';
import { Admingroup } from '../../model/orm/admingroup.model';
import { ObjectComponent } from '../_object.component';
import {STATIC_TOKEN} from "../../tokens";
import {AdmLangRepository} from "../../services/repositories/admlang.repository";
import {AppService} from "../../services/app.service";
import {FilesService} from "../../services/files.service";

@Component({
    selector: "the-admin",
    templateUrl: "./admin.component.html"
})
export class AdminComponent extends ObjectComponent<Admin> {
    @Input() agl: Admingroup[] = [];
    public imgFolder: string = "admins";
	public imgResizeWidth: number[] = [150];

  constructor(
    @Inject(STATIC_TOKEN) protected staticPath: string,
    protected admlangRepository: AdmLangRepository,
    protected appService?: AppService,
    protected filesService?: FilesService,
  ) {
    super(admlangRepository, appService, filesService);
  }
}
