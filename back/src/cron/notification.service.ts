import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MailService } from "src/common/mail.service";
import { IRestaurantMailable } from "src/model/dto/restaurant.mailable.interface";
import { Admin } from "src/model/orm/admin.entity";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { Setting } from "src/model/orm/setting.entity";
import { Repository } from "typeorm";

@Injectable()
export class NotificationService {
    private restaurantsPerLetter: number = 10; // количество ресторанов в отчетах для админов

    constructor(
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,   
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,   
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,   
        private mailService: MailService,  
    ) {}

    // рассылка рестораторам уведомлений о низком балансе
    public async notifyEmployeesAboutLowMoney(): Promise<void> {                
        try {                        
            const strPrice: string = (await this.settingRepository.findOne({where: {p: "price"}}))?.v;  

            if (!strPrice) {
                return;
            }

            const price: number = parseFloat(strPrice);
            const rl: Restaurant[] = await this.restaurantRepository.find({relations: ["employees"]});

            for (let r of rl) {
                if (r.employees.length) {
                    const days: number = r.money / (r.employees.length * price);
                    
                    if (days >= -1 && days <= 3) {
                        for (let e of r.employees) {
                            if (e.is_admin) {
                                days >= 1 ?
                                    this.mailService.mailEmployeeRestaurantLowMoney(e.email, r, Math.floor(days)) : 
                                    this.mailService.mailEmployeeRestaurantNoMoney(e.email, r);
                            }
                        }                        
                    }
                }                
            }
        } catch (err) {
            let errTxt: string = `Error in NotificationService.notifyEmployeesAboutLowMoney: ${String(err)}`;
            console.log(errTxt);
        }           
    }    
    
    // рассылка админам уведомлений о низком балансе    
    public async notifyAdminsAboutLowMoney(): Promise<void> {     
        try {
            const strPrice: string = (await this.settingRepository.findOne({where: {p: "price"}}))?.v;  

            if (!strPrice) {
                return;
            }

            const price: number = parseFloat(strPrice);
            const rl: Restaurant[] = await this.restaurantRepository.find({relations: ["employees"]});
            const al: Admin[] = await this.adminRepository.find({where: {active: true, admingroup_id: 1}});
            const expirationDays = [0, 1, 2, 3];            

            for (let d of expirationDays) {                
                let filteredRl: Restaurant[] = this.restaurantsWithMoneyForDays(rl, d, price); // рестораны, у которых денег хватит на d дней
                let partitions: Restaurant[][] = [];
                let j = 0;

                // строим фрагменты по restaurantsPerLetter ресторанов на каждое письмо
                for (let i = 0; i < filteredRl.length; i++) {
                    if (i % this.restaurantsPerLetter === 0) {
                        partitions.push([]);
                        j++;
                    }

                    partitions[j-1].push(filteredRl[i]);
                }

                // отправляем фрагменты 
                for (j = 0; j < partitions.length; j++) {
                    // преобразуем массив в упрощенную форму для подстановки в цикличный шаблон
                    let mailableRestaurants: IRestaurantMailable[] = partitions[j].map(r => ({                        
                        name: r.name,
                        email: r.employees.filter(e => e.is_admin)[0]?.email,
                        phone: r.phone,
                    }));
                    
                    for (let a of al) {
                        this.mailService.mailAdminRestaurantsLowNoMoney(a.email, mailableRestaurants, d, j+1, partitions.length);
                    }
                }
            }
        } catch (err) {
            let errTxt: string = `Error in NotificationService.notifyAdminsAboutLowMoney: ${String(err)}`;
            console.log(errTxt);
        }  
    }    

    // рестораны, у которых денег хватит на d дней
    private restaurantsWithMoneyForDays(rl: Restaurant[], d: number, price: number): Restaurant[] {
        let res: Restaurant[] = [];

        for (let r of rl) {
            if (r.employees.length) {
                const days: number = Math.floor(r.money / (r.employees.length * price));

                if (days === d) {
                    res.push(r);
                }
            }
        }

        return res;
    }
}