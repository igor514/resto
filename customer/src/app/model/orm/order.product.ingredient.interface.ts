export interface IOrderProductIngredient {
    readonly id: number;
    readonly order_product_id: number;
    readonly name: string;
    readonly included: boolean;
}