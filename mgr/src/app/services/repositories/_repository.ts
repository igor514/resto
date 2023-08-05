import { Childable } from 'src/app/model/childable.interface';
import { DataService } from '../data.service';

export abstract class Repository<T> {
    public schema?: string; // name of ORM model or Mongoose schema
    public schemaMl?: string; // name of ORM model or Mongoose schema for multilang param sets
    
    public xlChunk: T[] = []; // fragment
    public chunkCurrentPart: number = 0; // current paging state for fragment
    public chunkSortBy: string = "id"; // current sort by for fragment
    public chunkSortDir: number = 1; // current sort direction for fragment    
    public chunkLength: number = 10; // current length of fragment    

    public xlAll: T[] = []; // all objects
    public allSortBy: string = "id"; // current sort by for all objects
    public allSortDir: number = 1; // curent sort direction for all objects                
    public allLength: number = 0; // quantity of all objects in table        

    constructor(protected dataService: DataService) {}
    
    public updateParam (id: number, p: string, v: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.updateParam (this.schema, id, p, v).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });        
    }

    public updateEgoisticParam (id: number, p: string, v: boolean): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.updateEgoisticParam (this.schema, id, p, v).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });        
    }  
    
    public updateMlParam (id: number, p: string, v: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.updateParam (this.schemaMl, id, p, v).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });        
    }

    public tree2list(tree: Childable[]): Childable[] {
        let list: Childable[] = [];
        let buildChildren = (children: Childable[], level: number) => {            
            let res: Childable[] = [];
            
            children.forEach(child => {
                child.__level = level;
                child.__shift = "";

                for (let i: number = 0; i < level; i++) {
                    child.__shift += "&nbsp;&nbsp;&nbsp;";
                }

                res.push(child);
                res = res.concat(buildChildren(child.children as Childable[], level+1));
            });           
            
            return res;
        };

        tree.forEach(x => {
            list.push(x);
            list = list.concat(buildChildren(x.children as Childable[], 1));
        });

        return list;
    }

    // optional methods (they are abstract in fact, but not marked as abstract)
    public loadChunk?(): Promise<void>;
    public loadOne?(id: number): Promise<T>;    
    public delete?(id: number): Promise<void>;
    public deleteBulk?(ids: number[]): Promise<void>;
    public create?(x: T): Promise<void>;
    public update?(x: T): Promise<void>;
}
