export interface IGetChunk {
    readonly sortBy?: string;
    readonly sortDir?: number;
    readonly from?: number;
    readonly q?: number;
    readonly filter?: any; // JSON or string    
}
