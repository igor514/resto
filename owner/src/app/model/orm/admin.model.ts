import { Model } from '../model';

export class Admin extends Model {        
    public id: number;
    public admingroup_id: number;
    public name: string;
    public email: string;
    public password: string;
    public img: string;    
    public active: boolean;    
    public defended: boolean;        
}
