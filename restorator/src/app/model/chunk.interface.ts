export interface IChunk<T> {
    data: T[];
    allLength: number;
    sum?: number;
}