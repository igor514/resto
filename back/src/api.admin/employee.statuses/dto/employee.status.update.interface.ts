import { EmployeeStatusTranslation } from "src/model/orm/employee.status.translation.entity";

export interface IEmployeeStatusUpdate {
    readonly id: number;
    readonly color: string;
    readonly pos: number;
    readonly translations: EmployeeStatusTranslation[];
}