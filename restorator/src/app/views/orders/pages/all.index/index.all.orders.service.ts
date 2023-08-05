import { Injectable } from "@angular/core";
import { OrderStatus } from "src/app/model/orm/order.model";

@Injectable()
export class IndexAllOrdersService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;
    public currentPart: number = 0;
    public filterCreatedAt: Date[] = [null, null];
    public filterHallId: number = null;
    public filterTableId: number = null;
    public filterRoomId: number = null;
    public filterFloorId: number = null;
    public filterEmployeeId: number = null;
    public filterStatus: OrderStatus = null;
}
