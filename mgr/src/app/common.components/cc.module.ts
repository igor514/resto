import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ColorSketchModule } from 'ngx-color/sketch';

import { PaginationComponent } from './pagination/pagination.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingtableComponent } from './loading-table/loading-table.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { ImageviewerComponent } from './imageviewer/imageviewer.component';
import { CheckboxsliderComponent } from './checkbox-slider/checkboxslider.component';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { AnswerMonitorComponent } from './answer-monitor/answermonitor.component';
import { ExtraeditorComponent } from './extra-editor/extraeditor.component';
import { ConfirmerComponent } from './confirmer/confirmer.component';
import { ColorInputComponent } from './color-input/color-input.component';

@NgModule({
    imports: [             
        RouterModule,
        CommonModule,
        FormsModule,
        CKEditorModule,
        ColorSketchModule,
    ],
    declarations: [
        HeaderComponent,    
        SidebarComponent,        
        PaginationComponent, 
        LoadingtableComponent,
        ProgressbarComponent,
        ImageviewerComponent,
        CheckboxsliderComponent,
        DatetimePickerComponent,
        AnswerMonitorComponent,
        ExtraeditorComponent,
        ConfirmerComponent,
        ColorInputComponent,
    ],
    exports: [
        HeaderComponent, 
        SidebarComponent,    
        PaginationComponent,  
        LoadingtableComponent,     
        ProgressbarComponent,
        ImageviewerComponent,
        CheckboxsliderComponent,
        DatetimePickerComponent,
        AnswerMonitorComponent,
        ExtraeditorComponent,
        ConfirmerComponent,
        ColorInputComponent,
    ],
    providers: []
})
export class CCModule {    
}
