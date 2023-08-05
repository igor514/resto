import { Injectable } from "@angular/core";

@Injectable()
export class IndexEmployeesService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;
    public currentPart: number = 0;
    public filterCreatedAt: Date[] = [null, null];
    public filterName: string = "";
}