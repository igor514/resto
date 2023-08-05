import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpEvent } from "@angular/common/http";

import { IAnswer } from '../model/answer.interface';
import { DataService } from './data.service';
import { IPathable } from "../model/pathable.interface";

@Injectable()
export class FilesService {
    constructor(private dataService: DataService) {}

    public imgUpload(fd: FormData): Observable<HttpEvent<IAnswer<IPathable>>> {return this.dataService.filesImgUpload(fd);}    
    public imgUploadResize(fd: FormData): Observable<HttpEvent<IAnswer<IPathable>>> {return this.dataService.filesImgUploadResize(fd);}    
}
