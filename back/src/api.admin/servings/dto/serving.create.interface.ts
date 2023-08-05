import { ServingTranslation } from "src/model/orm/serving.translation.entity";

export interface IServingCreate {
    readonly pos: number;
    readonly translations: ServingTranslation[];
}