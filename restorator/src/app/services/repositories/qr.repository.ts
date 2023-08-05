import {DataService} from "../data.service";
import {QRModel} from "../../model/orm/qr.model";
import {Injectable} from "@angular/core";

@Injectable()
export class QRRepository {
  constructor(
    private dataService: DataService
  ) {}
  async get(restaurant_id: number): Promise<QRModel> {
    return new Promise((resolve, reject) => {
      this.dataService.getQR(restaurant_id).subscribe(res => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }

  async getMedia(restaurant_id: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.dataService.getQRMedia(restaurant_id).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err.message);
      });
    });
  }

  async getIcon(icon_id: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.dataService.getQRIcon(icon_id).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err.message);
      });
    });
  }

  async update(restaurant_id: number, form: FormData): Promise<number> {
    return new Promise((resolve, reject) => {
      this.dataService.updateQR(restaurant_id, form).subscribe(res => {
        if (res.statusCode === 200) {
          resolve(res.statusCode);
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }
}
