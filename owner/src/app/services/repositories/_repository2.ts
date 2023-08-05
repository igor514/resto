import { DataService } from "../data.service";

export abstract class Repository2 {    
    public chunkLength: number = 10;

    constructor(protected dataService: DataService) {}
}
