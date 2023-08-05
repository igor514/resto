import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { FinanceService } from "./finance.service";
import { NotificationService } from "./notification.service";

@Injectable()
export class CronService {
    constructor (
        private notoficationService: NotificationService,
        private financeService: FinanceService,
    ) {}     
    
    // рассылка рестораторам уведомлений о низком балансе
    @Cron('0 0 5 * * *') // каждый день в 5 утра                            
    public notifyEmployeesAboutLowMoney(): void {                
        this.notoficationService.notifyEmployeesAboutLowMoney();               
    }    
    
    // рассылка админам уведомлений о низком балансе
    @Cron('0 0 5 * * *') // каждый день в 5 утра                                   
    public notifyAdminsAboutLowMoney(): void {     
        this.notoficationService.notifyAdminsAboutLowMoney();        
    }  
    
    // снятие со счетов посуточной абонплаты
    @Cron('0 * * * * *') // проверка каждую минуту, сверка с временем в настройках
    public execPayments(): void {
        this.financeService.execPayments();
    }

    // удаление старых транзакций
    @Cron('0 0 0 * * *') // каждый день в 0:00
    public deleteOldTransactions(): void {
        this.financeService.deleteOldTransactions();
    }    
}
