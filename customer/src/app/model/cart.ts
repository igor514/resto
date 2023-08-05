import { ICartRecord } from "./cartrecord.interface";

export class Cart {
    constructor(
        public records: ICartRecord[] = [],  
        public serving_id: number = 1, // тип подачи - к столу, с собой и др.     
        public comment: string = "",
    ) {}
}
