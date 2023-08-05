import { ServingTranslation } from "src/model/orm/serving.translation.entity";

export interface IServingUpdate {
    readonly id: number;
    readonly pos: number;
    readonly defended: boolean;   
    readonly translations: ServingTranslation[];
}