import { DataService } from "../data.service";

export abstract class Repository<T> {    
    public schema: string = ""; // name of ORM model or Mongoose schema

    public xlChunk: T[] = []; // fragment
    public chunkCurrentPart: number = 0; // current paging state for fragment
    public chunkSortBy: string = "id"; // current sort by for fragment
    public chunkSortDir: number = 1; // current sort direction for fragment    
    public chunkLength: number = 10; // current length of fragment        

    public xlAll: T[] = []; // all objects
    public allSortBy: string = "id"; // current sort by for all objects
    public allSortDir: number = 1; // curent sort direction for all objects                
    public allLength: number = 0; // quantity of all objects in table    

    public exhausted: boolean = false; // no more chunks   
    public sum: number = 0; // sometimes we need to sum a column 
}
