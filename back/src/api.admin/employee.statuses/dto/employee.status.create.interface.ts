import { EmployeeStatusTranslation } from "src/model/orm/employee.status.translation.entity";

export interface IEmployeeStatusCreate {
    readonly color: string;
    readonly pos: number;
    readonly translations: EmployeeStatusTranslation[];
}