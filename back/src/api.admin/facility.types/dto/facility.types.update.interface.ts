import {FacilityTypeTranslation} from "../../../model/orm/facility.type.translation.entity";

export interface IFacilityTypeUpdate {
    readonly id: number;
    readonly name: string;
    readonly priority: number;
    readonly translations: FacilityTypeTranslation[];
}