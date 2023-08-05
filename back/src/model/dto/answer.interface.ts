export interface IAnswer<T> {
    statusCode: number;
    error?: string;
    data?: T;
    allLength?: number; // quantity of all elements in table    
    sum?: number;
}
