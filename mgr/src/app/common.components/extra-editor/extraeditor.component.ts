import { Component, EventEmitter, Input, Output } from "@angular/core";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Lang } from "src/app/model/orm/lang.model";

@Component({
    selector: "extra-editor",
    templateUrl: "extraeditor.component.html",
    styleUrls: ["extraeditor.component.scss"],    
})
export class ExtraeditorComponent {
    @Input() lang: Lang = null;
    @Input() data: string = "";
    @Output() dataChange: EventEmitter<string> = new EventEmitter();
    @Input() active: boolean = false;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();
    public editor = ClassicEditor;
    public editorCfg = {toolbar: {items: ['heading', '|', 'bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList', '|', '|', 'insertTable', '|', 'outdent', 'indent', '|', 'undo', 'redo'], shouldNotGroupWhenFull: true}};    
    
    public close(): void {
        this.activeChange.emit(false);
    }

    public apply(): void {
        this.dataChange.emit(this.data);
        this.close();
    }    
}