import { Injectable } from "@angular/core";

@Injectable()
export class IndexIngredientsService {
    public sortBy: string = "id";
    public sortDir: number = 1;
    public currentPart: number = 0;
}
