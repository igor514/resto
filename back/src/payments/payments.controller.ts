import {Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {PaymentsService} from "./payments.service";
import {AdminsGuard} from "../common/guards/admins.guard";
import {IAnswer} from "../model/dto/answer.interface";
import {PaymentConfig} from "../model/orm/payment.config.entity";
import {UpdateConfigFeeDto} from "./dto/balance/update.config.fee.dto";
import {GetFeeDto} from "./dto/balance/get.fee.dto";
import {BalanceFeeDto} from "./dto/balance/balance.fee.dto";
import {GetTotalDto} from "./dto/get.total.dto";
import {BalancePaymentDto} from "./dto/balance/balance.payment.dto";
import {IntentDto} from "./dto/intents/intent.dto";
import {CreateIntentDto} from "./dto/intents/create.intent.dto";
import {SubmitIntentDto} from "./dto/intents/submit.intent.dto";
import {IntentStatusDto} from "./dto/intents/intent.status.dto";
import {CombinedGuard} from "../common/guards/combined.guard";
import {PaymentConfigService} from "./payment.config.service";
import {BalanceCurrencyDto} from "./dto/balance/balance.currency.dto";
import {CreatePaymentLinkDto} from "./dto/links/create.payment.link.dto";
import {PaymentLinkDto} from "./dto/links/payment.link.dto";

@Controller({path: 'payments'})
export class PaymentsController {

    constructor(
        private paymentsService: PaymentsService,
        private configService: PaymentConfigService,
    ) {
    }

    @UseGuards(CombinedGuard)
    @UsePipes(new ValidationPipe({whitelist: true, skipNullProperties: true}))
    @Post('link')
    async paymentLink(@Body() body: CreatePaymentLinkDto): Promise<IAnswer<PaymentLinkDto>> {
        return this.paymentsService.paymentLink(body);
    }

    @UseGuards(CombinedGuard)
    @UsePipes(new ValidationPipe({whitelist: true, skipNullProperties: true}))
    @Post('types')
    paymentTypes(): IAnswer<string[]> {
        return this.paymentsService.paymentTypes();
    }

    @UsePipes(new ValidationPipe({whitelist: true, skipNullProperties: true}))
    @Post('intent')
    async createIntent(@Body() body: CreateIntentDto): Promise<IAnswer<IntentDto>> {
        if (body.restaurant_id && body.type) {
            return this.paymentsService.createBalanceIntent(body);
        } else if (body.order_id) {
            return this.paymentsService.createOrderIntent(body);
        }
    }

    @UsePipes(new ValidationPipe({whitelist: true, skipNullProperties: true}))
    @Post('intent/submit')
    async submitIntent(@Body() body: SubmitIntentDto): Promise<IAnswer<IntentStatusDto>> {
        return this.paymentsService.submitIntent(body);
    }

    @UsePipes(new ValidationPipe({whitelist: true, skipNullProperties: true}))
    @Post('order/total')
    async orderTotal(@Body() body: GetTotalDto): Promise<IAnswer<BalancePaymentDto>> {
        return this.paymentsService.getOrderTotal(body)
    }

    @UseGuards(CombinedGuard)
    @UsePipes(new ValidationPipe({whitelist: true, skipNullProperties: true}))
    @Post('balance/currency')
    getDefaultCurrency(): IAnswer<BalanceCurrencyDto> {
        return this.paymentsService.getBalanceCurrency();
    }

    @UseGuards(CombinedGuard)
    @UsePipes(new ValidationPipe({whitelist: true, skipNullProperties: true}))
    @Post('balance/total')
    async balanceTotal(@Body() body: GetTotalDto): Promise<IAnswer<BalancePaymentDto>> {
        return this.paymentsService.getBalanceTotal(body)
    }

    @UseGuards(AdminsGuard)
    @UsePipes(new ValidationPipe({whitelist: true, skipNullProperties: true}))
    @Post("balance/config")
    public balanceFees(@Body() body: GetFeeDto): Promise<IAnswer<PaymentConfig[]>> {
        return this.configService.getConfigs()
    }

    @UseGuards(AdminsGuard)
    @UsePipes(new ValidationPipe({whitelist: true, skipNullProperties: true}))
    @Post("balance/config/restaurant")
    public balanceRestFees(@Body() body: GetFeeDto): Promise<IAnswer<BalanceFeeDto>> {
        return this.configService.getRestaurantFees(body)
    }

    @UseGuards(AdminsGuard)
    @UsePipes(new ValidationPipe({whitelist: true, skipNullProperties: true}))
    @Post("balance/config/update")
    public updateBalanceRestFees(@Body() body: UpdateConfigFeeDto): Promise<IAnswer<void>> {
        return this.configService.updateFees(body);
    }
}
