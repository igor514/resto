export interface IGetChunk {
    readonly from?: number;
    readonly q?: number;
    readonly sortBy?: string;
    readonly sortDir?: number;
    readonly filter?: any; // JSON or string
}
