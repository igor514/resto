import {Injectable} from "@nestjs/common";
import {RestaurantFee} from "../api.owner/restaurants/dto/restaurant.fee";
import {PaymentMethod} from "../utils/constants";
import {StripeService} from "./stripe.service";
import {CryptoService} from "./crypto.service";

type IFee = Pick<RestaurantFee, 'secret_key' | 'payment_type'>
@Injectable()
export class FeeService {
    constructor(
        private stripeService: StripeService,
        private cryptoService: CryptoService
    ) {
    }

    async validateFee(fee: IFee): Promise<string> {
        if (fee.secret_key) {
            if (fee.payment_type === PaymentMethod.Stripe) {
                const isValid = await this.stripeService.isValidKey(fee.secret_key)
                if (!isValid) {
                    throw new Error(`${fee.payment_type} secret key is not valid`)
                }
                return this.cryptoService.encryptData(fee.secret_key)
            }
        }
        return null
    }
}