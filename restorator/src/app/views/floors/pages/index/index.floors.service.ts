import { Injectable } from "@angular/core";

@Injectable()
export class IndexFloorsService {
    public sortBy: string = "number";
    public sortDir: number = 1;
    public currentPart: number = 0;
}
