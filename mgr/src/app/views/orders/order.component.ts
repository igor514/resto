import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Component, Input} from '@angular/core';
import {IAnswer} from 'src/app/model/answer.interface';
import {IHTMLInputEvent} from 'src/app/model/htmlinputevent.interface';
import {Employee} from 'src/app/model/orm/employee.model';
import {Hall} from 'src/app/model/orm/hall.model';
import {Lang} from 'src/app/model/orm/lang.model';
import {Room} from 'src/app/model/orm/room.model';
import {Order, OrderStatus, Paymethod} from 'src/app/model/orm/order.model';
import {OrderProductIngredient} from 'src/app/model/orm/order.product.ingredient.model';
import {OrderProduct} from 'src/app/model/orm/order.product.model';
import {Serving} from 'src/app/model/orm/serving.model';
import {Table} from 'src/app/model/orm/table.model';
import {IPathable} from 'src/app/model/pathable.interface';
import {ObjectComponent} from '../_object.component';

@Component({
  selector: "the-order",
  templateUrl: "./order.component.html"
})
export class OrderComponent extends ObjectComponent<Order> {
  @Input() hl: Hall[] = [];
  @Input() el: Employee[] = [];
  @Input() sl: Serving[] = [];
  @Input() ll: Lang[] = [];
  @Input() rm: Room[] = [];

  public tab: number = 1;
  public statusActive: OrderStatus = OrderStatus.Active;
  public statusCompleted: OrderStatus = OrderStatus.Completed;
  public statusCancelled: OrderStatus = OrderStatus.Cancelled;
  public payCash: Paymethod = Paymethod.Cash;
  public payCard: Paymethod = Paymethod.Card;

  get tl(): Table[] {
    return this.hl.find(h => h.id === this.x.hall_id)?.tables || [];
  }


  // products
  public productsSubformActive: boolean = false;
  public product: OrderProduct = new OrderProduct().init();
  public productsImgFolder: string = "products";
  public productsImgProgress: number = 0;
  public productsImgResizeWidth: number[] = [500];

  public productsRemove(i: number): void {
    if (confirm(this.currentLang.phrases['workspace-sure'])) {
      this.x.products.splice(i, 1);
    }
  }

  public productsCreateIngredient(i: number): void {
    this.x.products[i].ingredients.push(new OrderProductIngredient().init());
  }

  public productsRemoveIngredient(i: number, j: number): void {
    this.x.products[i].ingredients.splice(j, 1);
  }

  public productsOnSubformKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.productsAdd();
    }
  }

  public productsAdd(): void {
    this.x.products.push(this.product);
    this.product = new OrderProduct().init();
    this.productsSubformActive = false;
  }

  public productsImgDelete(): void {
    this.product.img = null;
    this.productsImgProgress = 0;
  }

  public productsImgUploadResize(event: IHTMLInputEvent): void {
    this.productsImgProgress = 0;
    let file: File = <File>event.target.files[0];
    let fd: FormData = new FormData();
    fd.append("folder", this.productsImgFolder);
    fd.append("file", file, file.name);
    fd.append("resize", JSON.stringify(this.productsImgResizeWidth));
    this.appService.monitorLog(`uploading image ${file.name}...`);
    this.filesService
      .imgUploadResize(fd)
      .subscribe(event => this.productsImgProcessResponse(event), err => this.appService.monitorLog(err.message, true));
  }

  public productsImgProcessResponse(event: HttpEvent<IAnswer<IPathable>>): void {
    if (event.type === HttpEventType.UploadProgress) {
      this.productsImgProgress = Math.round(100 * event.loaded / event.total);
    } else if (event.type === HttpEventType.Response) {
      if (event.body.statusCode !== 200) {
        this.appService.monitorLog(event.body.error, true);
      } else {
        this.appService.monitorLog(`uploaded: ${event.body.data.paths[0]}`);
        this.product.img = event.body.data.paths[0];
      }
    }
  }

  /*
  // images
  public imgSubformActive: boolean = false;
  public imgProgress: number = 0;
  public imgFolder: string = "orders";
public imgResizeWidth: number[] = [500];
  public img: OrderImage = new OrderImage().init();

  public imgAdd(): void {
      this.x.images.push(this.img);
      this.appService.sort(this.x.images, "pos", 1);
      this.img = new OrderImage().init();
      this.imgSubformActive = false;
      this.imgProgress = 0;
  }

  public imgOnSubformKeyDown(event: KeyboardEvent): void {
      if (event.key === "Enter") {
          event.preventDefault();
          this.imgAdd();
      }
  }

  public imgRemove(i: number): void {
      if (confirm(this.currentLang.phrases['workspace-sure'])) {
          this.x.images.splice(i, 1);
      }
  }



  public imgProcessResponse(event: HttpEvent<IAnswer<IPathable>>): void {
      if (event.type === HttpEventType.UploadProgress) {
          this.imgProgress = Math.round (100 * event.loaded / event.total);
      } else if (event.type === HttpEventType.Response) {
          if (event.body.statusCode !== 200) {
              this.appService.monitorLog (event.body.error, true);
          } else {
              this.appService.monitorLog(`uploaded: ${event.body.data.paths[0]}`);
              this.img.img = event.body.data.paths[0];
          }
      }
  }*/
}
