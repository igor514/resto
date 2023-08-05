export interface IGetAll {
    readonly sortBy?: string;
    readonly sortDir?: number;
    readonly filter?: any; // JSON | string    
    readonly lang_id?: number;
}