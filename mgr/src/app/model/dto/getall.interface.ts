export interface IGetAll {
    readonly sortBy?: string;
    readonly sortDir?: number;    
    readonly filter?: any; // JSON or string
}
