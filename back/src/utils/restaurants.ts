import {Restaurant} from "../model/orm/restaurant.entity";
import {paymentMethods} from "./constants";
import {Repository} from "typeorm";
import {RestaurantFeeConfig} from "../model/orm/restaurant.fee.config";

export async function loadWithFees(
    id: number,
    restRepo: Repository<Restaurant>,
    feeRepo: Repository<RestaurantFeeConfig>
): Promise<Restaurant> {
    let data = await restRepo.findOne({where: {id}, relations: ['fees']})
    const updated: string[] = [];
    for (let type of paymentMethods) {
        if (!data.fees.find(f => f.payment_type !== type)) {
            await feeRepo.save(feeRepo.create({
                restaurant_id: data.id,
                payment_type: type,
            }))
            updated.push(type)
        }
    }
    if (updated.length) {
        data = await restRepo.findOne({where: {id}, relations: ['fees']})
    }
    return data;
}