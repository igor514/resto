import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpEvent } from "@angular/common/http";
import { DataService } from './data.service';
import { IAnswer } from "../model/dto/answer.interface";
import { IPathable } from "../model/dto/pathable.interface";

@Injectable()
export class FilesService {
    constructor(private dataService: DataService) {}

    public imgUpload(fd: FormData): Observable<HttpEvent<IAnswer<IPathable>>> {return this.dataService.filesImgUpload(fd);}    
    public imgUploadResize(fd: FormData): Observable<HttpEvent<IAnswer<IPathable>>> {return this.dataService.filesImgUploadResize(fd);}    
}
