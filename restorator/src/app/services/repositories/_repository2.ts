import { DataService } from "../data.service";

export abstract class Repository2 {    
    public schema: string = ""; 
    public chunkLength: number = 10;

    constructor(protected dataService: DataService) {}

    public updateParam (id: number, p: string, v: any): Promise<void> {
        return new Promise((resolve, reject) => this.dataService.updateParam (this.schema, id, p, v).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));        
    }
}
