import { Injectable } from "@nestjs/common";
import { MailService } from "src/common/mail.service";
import { APIService } from "../../common/api.service";

@Injectable()
export class EmailsService extends APIService {   
    constructor(private mailService: MailService) {
        super();
    } 

    public test(): string {
        this.mailService.mailTest();
        return "ok";
    }    
}
