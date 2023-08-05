import * as bcrypt from "bcrypt";
import { Lang } from "src/model/orm/lang.entity";

export abstract class APIService {
    protected isEmpty(v: any): boolean {
        return v === null || v === undefined;
    }
    
    protected twoDigits(n: number): string {
        return (n < 10) ? `0${n}` : `${n}`;
    }

    protected humanDatetime(date: Date): string {
        return `${this.twoDigits(date.getDate())}.${this.twoDigits(date.getMonth()+1)}.${date.getFullYear()} ${this.twoDigits(date.getHours())}:${this.twoDigits(date.getMinutes())}`;
    }

    public beautifulDatetime(date: Date, langslug: string): string {
        if (langslug === "ru" || langslug === "en") {
            return `${date.getDate()} ${this.numToMonth(date.getMonth()+1, langslug)}, ${date.getFullYear()}, ${date.getHours()}:${this.twoDigits(date.getMinutes())}`;
        }
        
        return `${date.getDate()}.${this.twoDigits(date.getMonth()+1)}.${date.getFullYear()} ${date.getHours()}:${this.twoDigits(date.getMinutes())}`;
    }

    public numToMonth(month: number, langslug: string): string {
        if (langslug === "ru") {
            if (month === 1) return "января";
            if (month === 2) return "февраля";
            if (month === 3) return "марта";
            if (month === 4) return "апреля";
            if (month === 5) return "мая";
            if (month === 6) return "июня";
            if (month === 7) return "июля";
            if (month === 8) return "августа";
            if (month === 9) return "сентября";
            if (month === 10) return "октября";
            if (month === 11) return "ноября";
            if (month === 12) return "декабря";            
            return "";
        }

        if (langslug === "en") {
            if (month === 1) return "Jan";
            if (month === 2) return "Feb";
            if (month === 3) return "Mar";
            if (month === 4) return "Apr";
            if (month === 5) return "May";
            if (month === 6) return "Jun";
            if (month === 7) return "Jul";
            if (month === 8) return "Aug";
            if (month === 9) return "Sep";
            if (month === 10) return "Oct";
            if (month === 11) return "Nov";
            if (month === 12) return "Dec";            
            return "";
        }

        return "";
    }    

    protected rnd(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    protected randomString(length: number, mode: string = "full"): string {
        let result: string = '';
        let characters: string = "";
        
        if (mode === "full") characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        if (mode === "lowercase") characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        if (mode === "digits") characters = "0123456789";        
        
        var charactersLength = characters.length;
        
        for (let i: number = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
    }

    protected pause(t: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), t);
        });
    }

    protected comparePassHash(password, hash): Promise<boolean> {
        return new Promise((resolve, reject) => {            
            bcrypt.compare(password, hash, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    protected filterToQbfilter(filter: any, entity: string): string {        
        let filterParts: string[] = [];        
        
        for (let field in filter) {                
            let operator: string = typeof(filter[field]) === "string" && filter[field].includes("%") ? "like" : "=";            
            filterParts.push(`${entity}.${field} ${operator} :${field}`);
        }        
        
        return filterParts.join(" AND ");
    }

    protected mysqlDate(date: Date): string {
        return `${date.getFullYear()}-${this.twoDigits(date.getMonth()+1)}-${this.twoDigits(date.getDate())}`;
    }

    protected mysqlDateTime(date: Date): string {
        return `${date.getFullYear()}-${this.twoDigits(date.getMonth()+1)}-${this.twoDigits(date.getDate())} ${this.twoDigits(date.getHours())}:${this.twoDigits(date.getMinutes())}:${this.twoDigits(date.getSeconds())}`;
    }

    protected daysInMonth(month: number, year: number): number {
        return new Date(year, month, 0).getDate();
    }

    protected translationsToObject(translations: any[], field: string, langs: Lang[]): Object {
        let data = {};

        for (let translation of translations) {
            let langslug: string = langs.find(l => l.id === translation.lang_id)?.slug;
            langslug ? data[langslug] = translation[field] : null;
        }

        return data;
    }    
}
