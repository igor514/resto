import {WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import {Socket, Server} from 'socket.io';
import {defaultVersion, maxConnections, storageTime} from 'src/options';
import {StorageService} from "./storage.service";
import {ClientAuth} from "./dto/auth.interface";

// gateway don't support global versioning
@WebSocketGateway(3046, {path: `/v${defaultVersion}/socket`, cors: true, transports: ['websocket']},)
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() public server: Server;

    constructor(private storageService: StorageService) {}

    public async handleDisconnect(client: Socket) {
        const auth = client.handshake.auth as ClientAuth;
        console.log(`socket client disconnected: ${auth.id}`);
        await this.storageService.setLastTimestamp(client, Date.now());
    }

    public async handleConnection(client: Socket, ...args: any[]) {
        const auth = client.handshake.auth as ClientAuth;
        if (this.server.engine.clientsCount > maxConnections) {
            console.log("too many connections");
            client.disconnect();
        } else {
            console.log(`socket client connected: ${auth.id}`);
            const lastTimestamp = await this.storageService.getLastTimestamp(client);
            const now = Date.now()
            const delta = now - lastTimestamp
            let lastUpdate:number;
            if (lastTimestamp && delta / 1000 < storageTime && delta > 0) {
                const events = await this.storageService.getMessages(lastTimestamp);
                for (const event of events) {
                    client.emit(event.name, event.data);
                    lastUpdate = Date.now()
                }
            }
            if (lastUpdate) {
                this.storageService.setLastTimestamp(client, lastUpdate)
            }
        }
    }
}
