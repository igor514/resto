import {Injectable, OnModuleInit} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Restaurant} from "../model/orm/restaurant.entity";
import {In, Repository} from "typeorm";
import {PaymentConfig as Settings} from "../model/orm/payment.config.entity";
import {IAnswer} from "../model/dto/answer.interface";
import {GetFeeDto} from "./dto/balance/get.fee.dto";
import {BalanceFeeDto} from "./dto/balance/balance.fee.dto";
import {UpdateConfigFeeDto} from "./dto/balance/update.config.fee.dto";
import {paymentMethods} from "../utils/constants";
import {RestaurantFeeConfig} from "../model/orm/restaurant.fee.config";
import {PriceService} from "../common/price.service";

@Injectable()
export class PaymentConfigService implements OnModuleInit {

    async onModuleInit(): Promise<any> {
        const records = await this.configRepository.find({where: {type: In(paymentMethods)}})
        for (const type of paymentMethods) {
            if (!records.find(r => r.type === type)) {
                await this.configRepository.save(
                    this.configRepository.create({type})
                )
            }
        }
    }

    constructor(
        @InjectRepository(Restaurant) protected restaurantRepository: Repository<Restaurant>,
        @InjectRepository(RestaurantFeeConfig) protected feeRepository: Repository<RestaurantFeeConfig>,
        @InjectRepository(Settings) private configRepository: Repository<Settings>,
        private priceService: PriceService,
    ) {
    }

    async updateFees(body: UpdateConfigFeeDto) {
        try {
            await this.updateEntity(body)
            return {statusCode: 200}
        } catch (err) {
            return {statusCode: 500, error: err.message}
        }
    }

    public async getRestaurantFees(body: GetFeeDto): Promise<IAnswer<BalanceFeeDto>> {
        try {
            return {
                statusCode: 200,
                data: await this.priceService.balanceFees(body.restaurant_id, body.type)
            }
        } catch (e) {
            return {
                statusCode: 500,
                error: e.message
            }
        }
    }

    public async getConfigs(): Promise<IAnswer<Settings[]>> {
        try {
            const types = await this.configRepository.find({
                where: {
                    type: In(paymentMethods)
                }
            })
            return {
                statusCode: 200,
                data: types
            }
        } catch (e) {
            return {
                statusCode: 500,
                error: e.message,
            }
        }
    }

    private async updateEntity(body: UpdateConfigFeeDto): Promise<void> {
        const {type, ...rest} = body
        await this.configRepository.update({type}, rest);
    }
}