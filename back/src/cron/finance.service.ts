import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThanOrEqual, Repository } from "typeorm";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { Setting } from "src/model/orm/setting.entity";
import { Transaction, BalanceType } from "src/model/orm/transaction.entity";

@Injectable()
export class FinanceService {
    constructor(
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,           
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,   
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,   
    ) {}

    // снятие со счетов посуточной абонплаты
    public async execPayments(): Promise<void> {
        try {
            const strPayTime: string = (await this.settingRepository.findOne({where: {p: "pay-time"}}))?.v;  
            const strPrice: string = (await this.settingRepository.findOne({where: {p: "price"}}))?.v;  

            if (!strPayTime || !strPrice) {
                return;
            }
            
            const payHour: number = parseInt(strPayTime.split(":")[0]);
            const payMinute: number = parseInt(strPayTime.split(":")[1]);
            const now: Date = new Date();
            const hour: number = now.getHours();
            const minute: number = now.getMinutes();
            const second: number = now.getSeconds();

            if (hour === payHour && minute === payMinute) {
                const price: number = parseFloat(strPrice);
                const rl: Restaurant[] = await this.restaurantRepository.find({where: {money: MoreThanOrEqual(0), active: true}, relations: ["employees"]});
    
                for (let r of rl) {                
                    if (r.employees.length) {
                        const amount = price * r.employees.length;                    
                        r.money -= price * r.employees.length;
                        await this.restaurantRepository.save(r);
                        const t: Transaction = new Transaction();
                        t.restaurant_id = r.id;
                        t.balance_type = BalanceType.Auto;
                        t.amount = -amount;
                        await this.transactionRepository.save(t);                
                    }                    
                }

                console.log("payments done", new Date());
            }                        
        } catch (err) {
            let errTxt: string = `Error in FinanceService.execPayments: ${String(err)}`;
            console.log(errTxt);
        }
    }

    // удаление старых транзакций
    public async deleteOldTransactions(): Promise<void> {
        try {
            await this.transactionRepository.createQueryBuilder().delete().where("created_at < NOW() - INTERVAL '3 YEAR'").execute();
        } catch (err) {
            let errTxt: string = `Error in FinanceService.deleteOldTransactions: ${String(err)}`;
            console.log(errTxt);
        }
    }
}