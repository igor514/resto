import { Input, Component } from '@angular/core';

import { IHTMLInputEvent } from '../model/htmlinputevent.interface';
import { AdmLang } from '../model/admlang.model';
import { AdmLangRepository } from '../services/repositories/admlang.repository';
import { AppService } from '../services/app.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { IAnswer } from '../model/answer.interface';
import { IPathable } from '../model/pathable.interface';
import { IImagable } from '../model/imagable.interface';
import { FilesService } from '../services/files.service';

@Component({template:""})
export abstract class ObjectComponent<T> {    
    @Input() x: T & IImagable;
    @Input() requiredFields: string[] = [];    

    public editorCfg = {toolbar: {items: ['heading', '|', 'bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList', '|', '|', 'insertTable', '|', 'outdent', 'indent', '|', 'undo', 'redo'], shouldNotGroupWhenFull: true}};    

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected appService?: AppService,
        protected filesService?: FilesService,
    ) {}

    get currentLang(): AdmLang {return this.admlangRepository.currentLang;}    

    public isRequired(field: string): boolean {
        return this.requiredFields.includes(field);
    }  

    // images
    public imgProgress: number = 0;    
    public imgFolder: string;    
    public imgResizeWidth: number[] = [500];
    public imgToView: string = null;    
    public imgViewerActive: boolean = false;

    public imgUpload(event: IHTMLInputEvent): void {
        this.imgProgress = 0;
        let file: File = <File>event.target.files[0];                
        let fd: FormData = new FormData ();
        fd.append("folder", this.imgFolder);            
        fd.append("file", file, file.name);        
        this.appService.monitorLog(`uploading image ${file.name}...`);
        this.filesService
            .imgUpload(fd)
            .subscribe (event => this.imgProcessResponse(event), err => this.appService.monitorLog (err.message, true));            
    }

    public imgUploadResize(event: IHTMLInputEvent): void {
        this.imgProgress = 0;
        let file: File = <File>event.target.files[0];                
        let fd: FormData = new FormData ();
        fd.append("folder", this.imgFolder);
        fd.append("file", file, file.name);            
        fd.append("resize", JSON.stringify(this.imgResizeWidth));
        this.appService.monitorLog(`uploading image ${file.name}...`);
        this.filesService
            .imgUploadResize(fd)
            .subscribe (event => this.imgProcessResponse(event), err => this.appService.monitorLog (err.message, true));            
    }   
    
    public imgProcessResponse(event: HttpEvent<IAnswer<IPathable>>): void {        
        if (event.type === HttpEventType.UploadProgress) {
            this.imgProgress = Math.round (100 * event.loaded / event.total);                    
        } else if (event.type === HttpEventType.Response) {
            if (event.body.statusCode !== 200) {                        
                this.appService.monitorLog (event.body.error, true);                
            } else {
                this.appService.monitorLog(`uploaded: ${event.body.data.paths[0]}`);
                this.x.img = event.body.data.paths[0];                        
            }            
        } 
    }

    public imgDelete(): void {
        this.x.img = null;        
        this.imgProgress = 0;
    }

    public imgView(img: string): void {
        this.imgToView = img;
        this.imgViewerActive = true;
    }      
}
