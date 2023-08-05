import {Injectable} from "@nestjs/common";
import Stripe from "stripe";
import {STRIPE_CONFIG} from "../config/options";
import {Request} from 'express'
import {PaymentType} from "../model/orm/transaction.entity";

@Injectable()
export class StripeService {
    public stripe: Stripe;

    constructor() {
        this.stripe = this.getClient(STRIPE_CONFIG.secret_key)
    }

    private getClient(secretKey: string): Stripe {
        return new Stripe(secretKey, {
            apiVersion: "2022-11-15"
        })
    }
    public async constructEvent(request: Request) {
        return this.stripe.webhooks.constructEvent(
            request.body,
            request.headers['stripe-signature'],
            STRIPE_CONFIG.webhook_secret
        )
    }

    public async createPaymentLink(amount: number, currency: string, type: PaymentType): Promise<Stripe.Response<Stripe.PaymentLink>> {
        const product_name = type === PaymentType.Balance ? "Recharge restaurant balance" : "Customer order"
        const unit_amount = +(amount * 100).toFixed(2)
        const price = await this.stripe.prices.create({
            currency, unit_amount, product_data: {name: product_name}
        })
        const link = await this.stripe.paymentLinks.create({
            line_items: [{
                price: price.id,
                quantity: 1,
            }],
            after_completion: {type: 'hosted_confirmation'}
        })
        return link
    }

    public async isValidKey(secretKey: string) {
        try {
            const client = this.getClient(secretKey)
            const token = await client.tokens.create({
                account: {
                    individual: {
                        first_name: 'Jane',
                        last_name: 'Doe',
                    },
                    tos_shown_and_accepted: true,
                },
            });
            return token.id !== null
        } catch (err) {
            return false
        }

    }

    async createIntent(value: number, currency: string): Promise<Stripe.Response<Stripe.PaymentIntent>> {
        // stripe accepts smallest units, i.e. 100 cents for 1$ payment
        const amount =  +(value * 100).toFixed(0)
        return await this.stripe.paymentIntents.create({
            amount, currency
        })
    }

    async getIntent(intent_id: string): Promise<Stripe.Response<Stripe.PaymentIntent>> {
        return await this.stripe.paymentIntents.retrieve(intent_id)
    }
}