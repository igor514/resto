import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { AppService } from "./app.service";
import {IWSServer} from "../model/dto/wsserver.interface";
import {nanoid} from "nanoid";

@Injectable()
export class SocketService {
  protected readonly apiVersion = 1
  public servers: IWSServer[] = [];
  private serverIndex: number = 0;
  public socket: Socket = null;
  public socketConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // количество событий
  public readonly RECONNECT_TIMEOUT = 1_000

  private _clientId: string;
  get clientId(): string {
    if (!this._clientId) {
      this._clientId = nanoid()
    }
    return this._clientId
  }


  constructor(
    private appService: AppService,
  ) {}

  public connect(): void {
    if (this.serverIndex < this.servers.length) {
      this.socket = io(this.servers[this.serverIndex].url, {
        path: `/v${this.apiVersion}/socket`,
        transports: ['websocket'],
        auth: {id: this.clientId
        }});
      this.initEvents();
    }
  }

  public disconnect(): void {
    this.socket.off();
    this.socket.disconnect();
    console.log("socket disconnected");
  }

  private initEvents(): void {
    this.socket.on("connect", () => {
      console.log("socket connected");
      this.socketConnected.next(true);
    });
    this.socket.on("disconnect", (reason) => this.reconnect(reason));
    this.socket.on("connect_error", (error) => this.reconnect(error.name));
    this.socket.on("connect_timeout", (reason) => this.reconnect(reason));
  }

  private async reconnect(disconnectReason: string): Promise<void> {
    this.socketConnected.next(false);
    this.disconnect();
    console.log(`${disconnectReason} reconnecting socket...`)
    await this.appService.pause(this.RECONNECT_TIMEOUT);
    this.serverIndex = this.nextServer
    this.connect();
  }

  private get nextServer(): number {
    return this.serverIndex < this.servers.length - 1 ? this.serverIndex + 1 : 0;
  }

}
