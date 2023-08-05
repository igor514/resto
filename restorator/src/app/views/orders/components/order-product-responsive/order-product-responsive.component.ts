import {Component, EventEmitter, Inject, Input, Output} from "@angular/core";
import { Employee } from "src/app/model/orm/employee.model";
import { Lang } from "src/app/model/orm/lang.model";
import { IOrderProduct } from "src/app/model/orm/order.product.interface";
import { IServing } from "src/app/model/orm/serving.interface";
import { Words } from "src/app/model/orm/words.type";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { WordRepository } from "src/app/services/repositories/word.repository";

import {STATIC_TOKEN} from "../../../../tokens";

@Component({
    selector: "order-product-responsive",
    templateUrl: "order-product-responsive.component.html",
    styleUrls: ["../../styles/order-product-edit.scss"],
})
export class OrderProductResponsiveComponent {
    @Input() product: IOrderProduct = null;
    @Input() sl: IServing[] = [];
    @Output() delete: EventEmitter<void> = new EventEmitter();

    constructor(
        @Inject(STATIC_TOKEN) protected staticPath: string,
        private wordRepository: WordRepository,
        private appService: AppService,
        private authService: AuthService,
    ) {}

    get words(): Words {return this.wordRepository.words;}
    get currentLang(): Lang {return this.appService.currentLang.value;}
    get employee(): Employee {return this.authService.authData.value.employee;}
    get currency_symbol(): string {return this.employee.restaurant.currency.symbol;}

    public onDelete(): void {
        this.delete.emit();
    }
}
