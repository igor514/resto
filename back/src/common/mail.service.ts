import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as Nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { Setting } from "src/model/orm/setting.entity";
import { Mailtemplate } from "src/model/orm/mailtemplate.entity";
import { MailtemplateTranslation } from "src/model/orm/mailtemplate.translation.entity";
import { APIService } from "./api.service";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { IRestaurantMailable } from "src/model/dto/restaurant.mailable.interface";
import { IMailtemplateData } from "src/model/dto/mailtemplatedata.interface";

@Injectable()
export class MailService extends APIService {
    constructor(
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,
        @InjectRepository(Mailtemplate) private mailtemplateRepository: Repository<Mailtemplate>,        
    ) {
        super();
    }
    
    public send(to: string, subject: string, html: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const host: string = (await this.settingRepository.findOne({where: {p: "smtp-host"}}))?.v;                
                const port: string = (await this.settingRepository.findOne({where: {p: "smtp-port"}}))?.v;                
                const from: string = (await this.settingRepository.findOne({where: {p: "smtp-login"}}))?.v;                
                const pw: string = (await this.settingRepository.findOne({where: {p: "smtp-pw"}}))?.v;
    
                if (!host || !port || !from || !pw) {  
                    console.log(`Error in MailService.send: some setting not found`);              
                    reject("some setting not found");
                }                     
                
                const transporter: Mail = Nodemailer.createTransport({host, port: parseInt(port), secure: false, auth: {user: from, pass: pw}});
                const mailOptions: MailOptions = {from, to, subject, html};
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(`Error in MailService.send: ${String(error)}`);     
                        reject(String(error));
                    } else {
                        console.log(`Email sent: ${new Date()}, ${info.response}`);
                        resolve();
                    }
                });
            } catch (err) {
                console.log(`Error in MailService.send: ${String(err)}`);     
                reject(String(err));
            }            
        });
    }       

    private getMailtemplateData(name: string, lang_id: number): Promise<IMailtemplateData> {
        return new Promise(async (resolve, reject) => {
            try {
                let mt: Mailtemplate = await this.mailtemplateRepository.findOne({where: {name}, relations: ["translations"]});

                if (!mt) {
                    reject("mailtemplate not found");
                } else {
                    const t: MailtemplateTranslation = mt.translations.find(t => t.lang_id === lang_id);
                    t.content = t.content.replace((/  |\r\n|\n|\r/gm), "");
                    resolve({subject: t.subject, content: t.content});
                }
            } catch (err) {
                reject(String(err));
            }
        });
    }

    private buildCycledFragment(content: string, array: any[], arrayName: string, arrayElementName: string, arrayElementFields: string[]): string {
        const cycledRawStart = `{{foreach ${arrayName} ${arrayElementName}}}`;
        const cycledRawEnd = "{{endforeach}}";
        const cycledRawStartPos = content.indexOf(cycledRawStart) + cycledRawStart.length;            
        const cycledRawEndPos = content.indexOf(cycledRawEnd, cycledRawStartPos);
        const cycledRawInner = content.substr(cycledRawStartPos, cycledRawEndPos - cycledRawStartPos);
        const cycledRaw = cycledRawStart + cycledRawInner + cycledRawEnd;
        let cycledCompiled = "";

        for (let x of array) {
            let item = cycledRawInner;

            for (let field of arrayElementFields) {
                let expressionToReplace = new RegExp(`{{${arrayElementName}.${field}}}`, "g");
                item = item.replace(expressionToReplace, x[field] || "");
            }            
            
            cycledCompiled += item;
        }

        return content.replace(cycledRaw, cycledCompiled);
    }

    public async mailTest(): Promise<void> {
        try {  
            const mtd: IMailtemplateData = await this.getMailtemplateData("test", 1);   
            const subject: string = mtd.subject;
            const content: string = mtd.content;
            await this.send("7573497@gmail.com", subject, content);   
        } catch (err) {
            console.log(`Error in MailService.mailTest: ${String(err)}`); 
        }
    }    

    public async mailEmployeeRestaurantCreated(restaurant: Restaurant): Promise<void> {
        try {            
            const mtd: IMailtemplateData = await this.getMailtemplateData("[employee]restaurant-created", restaurant.lang_id);               
            const subject: string = mtd.subject;
            const content: string = mtd.content                
                .replace(/{{name}}/g, restaurant.name)        
                .replace(/{{domain}}/g, restaurant.domain)    
                .replace(/{{ownername}}/g, restaurant.ownername)    
                .replace(/{{phone}}/g, restaurant.phone)    
                .replace(/{{address}}/g, restaurant.address)    
                .replace(/{{inn}}/g, restaurant.inn)    
                .replace(/{{ogrn}}/g, restaurant.ogrn)    
                .replace(/{{currency}}/g, restaurant.currency.name)    
                .replace(/{{language}}/g, restaurant.lang.title)    
                .replace(/{{email}}/g, restaurant.employees[0].email)
                .replace(/{{password}}/g, restaurant.employees[0].password);                
            await this.send(restaurant.employees[0].email, subject, content);               
        } catch (err) {
            console.log(`Error in MailService.mailRestaurantCreated: ${String(err)}`);            
        }
    }

    public async mailEmployeeRestaurantLowMoney(email: string, restaurant: Restaurant, days: number): Promise<void> {
        try {            
            const mtd: IMailtemplateData = await this.getMailtemplateData("[employee]restaurant-low-money", restaurant.lang_id);               
            const subject: string = mtd.subject;
            const content: string = mtd.content
                .replace(/{{name}}/g, restaurant.name)
                .replace(/{{days}}/g, days.toString());                
            await this.send(email, subject, content);               
        } catch (err) {
            console.log(`Error in MailService.mailEmployeeRestaurantLowmoney: ${String(err)}`);            
        }
    }

    public async mailEmployeeRestaurantNoMoney(email: string, restaurant: Restaurant): Promise<void> {
        try {            
            const mtd: IMailtemplateData = await this.getMailtemplateData("[employee]restaurant-no-money", restaurant.lang_id);               
            const subject: string = mtd.subject;
            const content: string = mtd.content.replace(/{{name}}/g, restaurant.name);                
            await this.send(email, subject, content);               
        } catch (err) {
            console.log(`Error in MailService.mailEmployeeRestaurantNomoney: ${String(err)}`);            
        }
    }

    public async mailAdminRestaurantsLowNoMoney(email, restaurants: IRestaurantMailable[], days: number, part: number, parts: number): Promise<void> {
        try {
            const mtd: IMailtemplateData = await this.getMailtemplateData("[admin]restaurants-low-no-money", 1);               
            const subject: string = mtd.subject
                .replace(/{{days}}/g, days.toString())
                .replace(/{{part}}/g, part.toString())
                .replace(/{{parts}}/g, parts.toString());
            const content: string = this.buildCycledFragment(mtd.content, restaurants, "restaurants", "r", ["name", "email", "phone"]);
            await this.send(email, subject, content);
        } catch (err) {
            console.log(`Error in MailService.mailAdminRestaurantsExpiring: ${String(err)}`);            
        }
    }    
}