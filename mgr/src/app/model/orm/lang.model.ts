import { Model } from '../model';

export class Lang extends Model {    
    public id: number;
    public slug: string;    
    public title: string;
    public shorttitle: string;
    public img: string;    
    public pos: number;
    public active: boolean;
    public slugable: boolean;
    public dir: string; 
    public defended: boolean;    

    public init(): Lang {
        this.active = true;
        this.pos = 0;
        this.dir = "ltr";  
        this.slugable = false;  
        
        return this;
    }    
}
