import {Injectable} from "@nestjs/common";
import {RedisService} from "@liaoliaots/nestjs-redis";
import Redis from "ioredis";
import {ISocketMsg, IStoredMsg} from "./dto/socket.msg.interface";
import {storageTime} from "./options";
import {Socket} from "socket.io";
import {ClientAuth} from "./dto/auth.interface";

@Injectable()
export class StorageService {
    private redis: Redis;
    private readonly eventsKey = 'events'
    constructor(private redisService: RedisService) {
        this.redis = redisService.getClient()
    }

    async storeMessage(msg: ISocketMsg): Promise<void> {
        const data: IStoredMsg = {...msg, timestamp: Date.now()}
        await this.redis.rpush(this.eventsKey, JSON.stringify(data))
        await this.redis.expire(this.eventsKey, storageTime)
    }

    async getMessages(timestamp: number): Promise<ISocketMsg[]> {
        let storeEvents = await this.redis.lrange(this.eventsKey, 0, -1);
        const ev = storeEvents.map((e) => JSON.parse(e))
        const evf = ev.filter(msg => msg.timestamp >= timestamp)
        const evm = evf.map(({ timestamp, ...msg }) => msg)
        return evm

        // return storeEvents
        //     .map((e) => JSON.parse(e))
        //     .filter(msg => msg.timestamp < timestamp)
        //     .map(({ timestamp, ...msg }) => msg)
    }

   async getLastTimestamp(client: Socket): Promise<number> {
        const lastTimestamp = await this.redis.get(this.timeKey(client));
        return lastTimestamp ? parseInt(lastTimestamp, 10) : 0;
    }

    async setLastTimestamp(client: Socket | string, timestamp: number): Promise<void> {
        if (typeof client === "string") {
            await this.redis.set(this.timeKey(client), timestamp.toString(), "EX", storageTime);
        } else {
            await this.redis.set(this.timeKey(client as Socket), timestamp.toString(), "EX", storageTime);
        }

    }

    private timeKey(client: Socket | string): string {
        if (typeof client === "string") {
            return `client:${client}:lastTimestamp`
        } else {
            const auth = (client as Socket).handshake.auth as ClientAuth
            return `client:${auth.id}:lastTimestamp`
        }

    }
}