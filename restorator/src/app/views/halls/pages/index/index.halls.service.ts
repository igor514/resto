import { Injectable } from "@angular/core";

@Injectable()
export class IndexHallsService {
    public sortBy: string = "pos";
    public sortDir: number = 1;
    public currentPart: number = 0;    
}