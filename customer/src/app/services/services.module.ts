import { NgModule } from '@angular/core';
import { AppService } from './app.service';
import { DataService } from './data.service';
import { GTService } from './gt.service';
import { CatRepository } from './repositories/cat.repository';
import { ProductRepository } from './repositories/product.repository';
import { ServingRepository } from './repositories/serving.repository';
import { WordRepository } from './repositories/word.repository';
import {PaymentService} from "./payment.service";
import {SocketService} from "./socket.service";
import {WSServerRepository} from "./repositories/wsserver.repository";

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        AppService,
        DataService,
        PaymentService,
        GTService,
        WordRepository,
        CatRepository,
        ProductRepository,
        ServingRepository,
        SocketService,
        WSServerRepository,
    ],
})
export class ServicesModule {}
