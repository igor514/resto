import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Setting} from "../model/orm/setting.entity";
import {Repository} from "typeorm";
import {Restaurant} from "src/model/orm/restaurant.entity";
import {IAnswer} from "../model/dto/answer.interface";
import {PaymentConfigService} from "./payment.config.service";
import {CreateIntentDto} from "./dto/intents/create.intent.dto";
import {IntentDto} from "./dto/intents/intent.dto";
import {GetFeeDto} from "./dto/balance/get.fee.dto";
import {BalanceFeeDto} from "./dto/balance/balance.fee.dto";
import {IntentStatusDto} from "./dto/intents/intent.status.dto";
import {SubmitIntentDto} from "./dto/intents/submit.intent.dto";
import {GetTotalDto} from "./dto/get.total.dto";
import {PaymentStatus, PaymentType, Transaction} from "../model/orm/transaction.entity";
import {PaymentMethod, paymentMethods} from "../utils/constants";
import {StripeService} from "../common/stripe.service";
import {BalancePaymentDto} from "./dto/balance/balance.payment.dto";
import {BalanceCurrencyDto} from "./dto/balance/balance.currency.dto";
import {Order, OrderStatus} from "../model/orm/order.entity";
import Stripe from "stripe";
import {PriceService} from "../common/price.service";
import {CreatePaymentLinkDto} from "./dto/links/create.payment.link.dto";
import {PaymentLinkDto} from "./dto/links/payment.link.dto";

@Injectable()
export class PaymentsService {

    constructor(
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        private configService: PaymentConfigService,
        private stripeService: StripeService,
        private priceService: PriceService,
    ) {
    }

    paymentTypes(): IAnswer<string[]> {
        return {
            statusCode: 200,
            data: paymentMethods
        }
    }

    async paymentLink(data: CreatePaymentLinkDto): Promise<IAnswer<PaymentLinkDto>> {
        try {
            let total = this.priceService.getPrice(
                data.amount,
                await this.priceService.balanceFees(data.restaurant_id, PaymentMethod.Stripe)
            ).total

            const currency = this.defaultBalanceCurrency().code
            const link = await this.stripeService.createPaymentLink(total, currency, data.type)

            const entity: Transaction = this.transactionRepository.create({
                amount: +(data.amount).toFixed(2),
                restaurant_id: data.restaurant_id,
                total: total,
                payment_link_id: link.id,
                payment_type: data.type,
                payment_status: PaymentStatus.Pending,
                balance_type: data.balance_type,
            })
            await this.transactionRepository.save(entity)

            return {
                statusCode: 200,
                data: {url: link.url, id: link.id}
            }
        } catch (error) {
            return {
                statusCode: 500,
                error: error.message
            }
        }
    }

    async createOrderIntent(data: CreateIntentDto): Promise<IAnswer<IntentDto>> {
        try {
            const order = await this.orderRepository.findOne({
                where: {id: data.order_id},
                relations: ['restaurant', 'restaurant.currency']
            });
            let total = this.priceService.getOrderPrice(
                data.amount,
                await this.priceService.orderFees(order.restaurant_id, PaymentMethod.Stripe)
            ).total
            const intent = await this.stripeService.createIntent(
                total, order.restaurant.currency.name
            )

            const entity: Transaction = this.transactionRepository.create({
                amount: +(data.amount).toFixed(2),
                order_id: data.order_id,
                total: total,
                payment_type: PaymentType.Order,
                payment_status: PaymentStatus.Pending,
                payment_id: intent.id,
            })
            await this.transactionRepository.save(entity)

            return {
                statusCode: 200,
                data: {intent_id: intent.client_secret}
            }
        } catch (e) {
            return {
                statusCode: 500,
                error: e.message
            }
        }

    }

    async createBalanceIntent(data: CreateIntentDto): Promise<IAnswer<IntentDto>> {
        try {
            let total = this.priceService.getPrice(
                data.amount,
                await this.priceService.balanceFees(data.restaurant_id, PaymentMethod.Stripe)
            ).total

            const currency = this.defaultBalanceCurrency().code
            const intent = await this.stripeService.createIntent(total, currency)

            const entity: Transaction = this.transactionRepository.create({
                amount: +(data.amount).toFixed(2),
                restaurant_id: data.restaurant_id,
                total: total,
                balance_type: data.type,
                payment_type: PaymentType.Balance,
                payment_status: PaymentStatus.Pending,
                payment_id: intent.id,
            })
            await this.transactionRepository.save(entity)

            return {
                statusCode: 200,
                data: {intent_id: intent.client_secret}
            }
        } catch (error) {
            return {
                statusCode: 500,
                error: error.message
            }
        }
    }

    public async balanceFeesDto(body: GetFeeDto): Promise<IAnswer<BalanceFeeDto>> {
        try {
            const data = await this.priceService.balanceFees(body.restaurant_id, body.type)
            return {
                statusCode: 200,
                data
            }
        } catch (error) {
            return {
                statusCode: 500,
                error: error.message
            }
        }
    }

    private async validateIntent(intent_id: string): Promise<[Transaction, Stripe.Response<Stripe.PaymentIntent>]> {
        const entity = await this.transactionRepository.findOne({
            where: {payment_id: intent_id, payment_status: PaymentStatus.Pending},
            relations: ['restaurant', 'order']
        })
        if (!entity) {
            throw new Error("Payment not found")
        }
        if (entity.payment_status !== PaymentStatus.Pending) {
            throw new Error("Payment already processed")
        }

        const intent = await this.stripeService.getIntent(entity.payment_id)
        if (intent.status !== 'succeeded') {
            await this.transactionRepository.update(entity.id, {payment_status: PaymentStatus.Rejected})
            throw new Error("Payment rejected")
        }
        return [entity, intent]
    }

    async submitIntent(data: SubmitIntentDto): Promise<IAnswer<IntentStatusDto>> {
        try {
            const [entity, intent] = await this.validateIntent(data.intent_id)

            if (entity.payment_type === PaymentType.Balance) {
                const rest = await this.restaurantRepository.findOne({
                    where: {id: entity.restaurant_id},
                    relations: ['currency']
                })
                await this.restaurantRepository.update(rest.id, {money: rest.money + entity.amount})
            } else if (entity.payment_type === PaymentType.Order) {
                const order = await this.orderRepository.findOne({
                    where: {id: entity.order_id},
                    relations: ['restaurant', 'restaurant.currency']
                })
                await this.orderRepository.update(order.id, {status: OrderStatus.Paid})
            }
            await this.transactionRepository.update(entity.id, {payment_status: PaymentStatus.Success})

            return {
                statusCode: 200,
                data: {
                    status: intent.status,
                    amount: entity.amount,
                    restaurant_id: entity?.restaurant_id,
                    order_id: entity?.order_id,
                    intent_id: entity.payment_id,
                }
            }
        } catch (error) {
            return {
                statusCode: 500,
                error: error?.message
            }
        }
    }

    public async getBalanceTotal(body: GetTotalDto): Promise<IAnswer<BalancePaymentDto>> {
        return {
            data: this.priceService.getPrice(
                body.amount,
                await this.priceService.balanceFees(body.restaurant_id, body.type)
            ),
            statusCode: 200
        }
    }

    public async getOrderTotal(body: GetTotalDto): Promise<IAnswer<BalancePaymentDto>> {
        return {
            data: this.priceService.getOrderPrice(
                body.amount,
                await this.priceService.orderFees(body.restaurant_id, body.type)
            ),
            statusCode: 200
        }
    }

    public getBalanceCurrency(): IAnswer<BalanceCurrencyDto> {
        return {
            data: this.defaultBalanceCurrency(),
            statusCode: 200,
        }
    }

    private defaultBalanceCurrency(): BalanceCurrencyDto {
        return {
            code: 'aed',
            symbol: 'د.إ'
        }
    }
}