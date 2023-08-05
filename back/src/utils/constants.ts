export enum PaymentMethod {
    Stripe = 'stripe'
}

export const paymentMethods: PaymentMethod[] = Object.keys(PaymentMethod).map(key => PaymentMethod[key]);