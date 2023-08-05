export interface IIngredient {
    readonly id: number;
    readonly product_id: number;
    readonly name: string;
    readonly pos: number;
    readonly excludable: boolean;    
    
    included: boolean;
}
