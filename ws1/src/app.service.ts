import { Injectable } from "@nestjs/common";
import { ISocketMsg } from "src/dto/socket.msg.interface";
import { AppGateway } from "./app.gateway";
import {StorageService} from "./storage.service";

@Injectable()
export class AppService {
    constructor(
        private storageService: StorageService,
        private appGateway: AppGateway
    ) {}

    public async translate(msg: ISocketMsg): Promise<void> {
        const onCallback = (err, responses: string[]) => {
            for (let item of responses) {
                this.storageService.setLastTimestamp(item, Date.now())
            }
        }
        await this.storageService.storeMessage(msg);
        this.appGateway.server.timeout(2000).emit(msg.name, msg.data, onCallback);
    }
}