import {OrderFeeDto} from "../payments/dto/order/order.fee.dto";
import {OrderPaymentDto} from "../payments/dto/order/order.payment.dto";
import {FeeDto} from "../payments/dto/fee.dto";
import {PaymentDto} from "../payments/dto/payment.dto";
import {Injectable} from "@nestjs/common";
import {PaymentMethod} from "../utils/constants";
import {loadWithFees} from "../utils/restaurants";
import {BalanceFeeDto} from "../payments/dto/balance/balance.fee.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Restaurant} from "../model/orm/restaurant.entity";
import {Repository} from "typeorm";
import {RestaurantFeeConfig} from "../model/orm/restaurant.fee.config";
import {PaymentConfig as Settings} from "../model/orm/payment.config.entity";

@Injectable()
export class PriceService {
    constructor(
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(RestaurantFeeConfig) private feeRepository: Repository<RestaurantFeeConfig>,
        @InjectRepository(Settings) private configRepository: Repository<Settings>
    ) {
    }
    public getOrderPrice(amount:  number, fees: OrderFeeDto): OrderPaymentDto {
        const data: OrderPaymentDto = {
            service_fee: 0,
            ...this.getPrice(amount, fees)
        }
        if (fees.service_fee) {
            data.service_fee = +(amount * fees.tax * 0.01).toFixed(2)
            data.total += data.tax_fee
        }
        return data
    }

    public getPrice(amount: number, fees: FeeDto): PaymentDto {
        const data: PaymentDto = {
            amount,
            total: amount,
            vat_fee: 0,
            tax_fee: 0,
            gateway_fee: 0
        }

        let total = amount;
        if (fees.vat) {
            data.vat_fee = +(amount * fees.vat * 0.01).toFixed(2)
            total += data.vat_fee
        }
        if (fees.tax) {
            data.tax_fee = +(amount * fees.tax * 0.01).toFixed(2)
            total += data.tax_fee
        }
        if (fees.gateway_fee) {
            data.gateway_fee = +(amount * fees.gateway_fee * 0.01).toFixed(2)
            total += data.gateway_fee
        }

        return {...data, total: +total.toFixed(2)}
    }

    public async orderFees(restaurant_id: number, type: PaymentMethod): Promise<OrderFeeDto> {
        const keys = ['vat', 'tax', 'service_fee', 'gateway_fee']
        const category = 'order'
        const rest = await loadWithFees(restaurant_id, this.restaurantRepository, this.feeRepository)
        const config = rest.fees.find(config => config.payment_type === type)
        let fees = {}
        for (let key of keys) {
            fees[key] = 0;
            if (config[`${key}_${category}`] && !config[`${key}_${category}_disabled`]) {
                fees[key] = config[`${key}_${category}`]
            }
        }
        return fees as OrderFeeDto
    }

    public async balanceFees(restaurant_id: number, type: PaymentMethod): Promise<BalanceFeeDto> {
        const entity = await this.getConfig(type);
        let {
            vat, vat_enabled,
            tax, tax_enabled,
            gateway_fee,
            gateway_fee_enabled

        } = entity;

        vat = vat || 0
        if (!vat_enabled) {
            vat = 0
        }
        tax = tax || 0
        if (!tax_enabled) {
            tax = 0
        }
        gateway_fee = gateway_fee || 0
        if (!gateway_fee_enabled) {
            gateway_fee = 0
        }

        const id = restaurant_id
        if (id) {
            const rest = await loadWithFees(id, this.restaurantRepository, this.feeRepository)
            const config = rest.fees.find(config => config.payment_type === type)

            if (config) {
                if (config.vat_balance_disabled) {
                    vat = 0
                } else if (config.vat_balance !== null) {
                    vat = config.vat_balance
                }

                if (config.tax_balance_disabled) {
                    tax = 0
                } else if (config.tax_balance !== null) {
                    tax = config.tax_balance
                }

                if (config.gateway_fee_balance_disabled) {
                    gateway_fee = 0
                } else if (config.gateway_fee_balance !== null) {
                    gateway_fee = config.gateway_fee_balance
                }
            }

        }
        return {
            vat, tax,
            gateway_fee
        }
    }

    private async getConfig(type: PaymentMethod): Promise<Settings> {
        return this.configRepository.findOne({where: {type}});
    }
}