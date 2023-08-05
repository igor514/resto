import {Injectable} from "@nestjs/common";
import {Request} from "express";
import {StripeService} from "../../common/stripe.service";
import Stripe from "stripe";
import {CheckoutSessionCompletedEvent} from "./events/checkout.session.completed";
import {InjectRepository} from "@nestjs/typeorm";
import {PaymentStatus, PaymentType, Transaction} from "../../model/orm/transaction.entity";
import {Repository} from "typeorm";
import {SocketService} from "../../common/socket/socket.service";
import {Restaurant} from "../../model/orm/restaurant.entity";

@Injectable()
export class WebhookService {
    constructor(
        @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
        @InjectRepository(Restaurant) private restaurantRepo: Repository<Restaurant>,
        private stripeService: StripeService,
        private socketService: SocketService,
    ) {
    }

    async handleWebhook(request: Request): Promise<void> {
        try {
            const event = await this.stripeService.constructEvent(request)
            switch (event.type) {
                case 'checkout.session.completed':
                    await this.onHostedPaymentComplete(event)
                    break
                default:
                    break
            }
            return null
        } catch (err) {
            console.log(err)
        }
    }

    async onHostedPaymentComplete(event: Stripe.Event) {
        const {payment_link} = <CheckoutSessionCompletedEvent>event.data.object
        const transaction = await this.transactionRepo.findOne({
            where: {
                payment_link_id: payment_link,
                payment_status: PaymentStatus.Pending
            }
        })
        if (transaction) {
            await this.transactionRepo.update({id: transaction.id}, {payment_status: PaymentStatus.Success})
            if (transaction.payment_type === PaymentType.Balance) {
                await Promise.all([
                    this.restaurantRepo
                        .createQueryBuilder()
                        .update()
                        .whereInIds([transaction.restaurant_id])
                        .set({money: () => `money + ${transaction.amount}`})
                        .execute(),
                    this.socketService.translateBalanceRecharged(payment_link, transaction.amount)
                ])
            }
        }
    }
}