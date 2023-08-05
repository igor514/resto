import {FacilityTypeTranslation} from "../../../model/orm/facility.type.translation.entity";

export interface IFacilityTypeCreate {
    readonly name: string;
    readonly priority: number;
    readonly translations: FacilityTypeTranslation[];
}