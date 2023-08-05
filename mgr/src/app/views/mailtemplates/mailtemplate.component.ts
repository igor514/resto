import { Component, Input, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Lang } from 'src/app/model/orm/lang.model';
import { Mailtemplate } from 'src/app/model/orm/mailtemplate.model';
import { ObjectComponent } from '../_object.component';

@Component({
    selector: "the-mailtemplate",
    templateUrl: "./mailtemplate.component.html"
})
export class MailtemplateComponent extends ObjectComponent<Mailtemplate> implements OnInit {    
    @Input() x: Mailtemplate;  
    @Input() ll: Lang[] = [];      
    public selectedLang: Lang;   
    public editor = ClassicEditor;   
    public contentMode = "html"; 

    public ngOnInit(): void {
        this.selectedLang = this.ll[0];
    }    
}
