import {Inject, Injectable} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";
import { Lang } from "../model/orm/lang.model";
import {DOCUMENT} from "@angular/common";

@Injectable()
export class AppService {
    public url: string[] = [];
    public currentLang: BehaviorSubject<Lang> = new BehaviorSubject(null);
    // iface
    public title: string = "";
    public langPanelActive: boolean = false;
    // error notifications
    public errorActive: boolean = false;
    public errorMessage: string = "";
    public errorTimer: number = null;

    constructor(private titleService: Title, @Inject(DOCUMENT) private document: Document) {}

    public initLang(langs: Lang[]): void {
        let langslug: string = localStorage.getItem("lang") || "en";

        this.currentLang.subscribe((value) => {
          document.dir = value?.dir || 'ltr';
        });

        if (langslug) {
            let lang = langs.find(l => l.slug === langslug);

            if (lang) {
                this.currentLang.next(lang);
            } else {
                this.currentLang.next(langs[0]);
                localStorage.setItem("lang", this.currentLang.value.slug);
            }
        } else {
            this.currentLang.next(langs[0]);
            localStorage.setItem("lang", this.currentLang.value.slug);
        }
    }

    public setLang(lang: Lang): void {
        this.currentLang.next(lang);
        localStorage.setItem("lang", this.currentLang.value.slug);
    }

    public showError(error: any): void {
        if (this.errorTimer) {
            clearTimeout(this.errorTimer);
        }

        this.errorMessage = typeof(error) !== "string" ? JSON.stringify(error) : error;
        this.errorActive = true;
        this.errorTimer = window.setTimeout (() => {
            this.errorActive = false;
            this.errorTimer = null;
        }, 3000);

        console.log(error);
    }

    public setTitle (title: string) {
        this.title = title;
        this.titleService.setTitle(this.decodeHTMLEntities(title));
    }

    public validateEmail (email: string): boolean {
        const re: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test (email.toLowerCase());
    }

    public pause(ms: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), ms);
        });
    }

    public decodeHTMLEntities(text: string): string {
        let entities = [
            ['amp', '&'],
            ['apos', '\''],
            ['#x27', '\''],
            ['#x2F', '/'],
            ['#39', '\''],
            ['#47', '/'],
            ['lt', '<'],
            ['gt', '>'],
            ['nbsp', ' '],
            ['quot', '"']
        ];

        for (let i: number = 0, max: number = entities.length; i < max; ++i) {
            text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);
        }

        return text;
    }

    public encodeHTMLEntities(text: string): string {
        return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    public pathHasClass(elements: HTMLElement[], className): boolean {
        for (let element of elements) {
            if (element.classList?.contains(className)) {
                return true;
            }
        }

        return false;
    }

    public twoDigits(n: number): string {
        return (n < 10) ? `0${n}` : `${n}`;
    }

    public formattedDateTime(date: Date): string {
        return date ? `${this.twoDigits(date.getDate())}.${this.twoDigits(date.getMonth()+1)}.${date.getFullYear()} ${this.twoDigits(date.getHours())}:${this.twoDigits(date.getMinutes())}` : "";
    }

    public formattedDate(date: Date): string {
        return date ? `${this.twoDigits(date.getDate())}.${this.twoDigits(date.getMonth()+1)}.${date.getFullYear()}` : "";
    }

    public trim(s: any): any {
        if (s === null || s === undefined) {
            return "";
        } else if (typeof(s) === "string") {
            return s.trim();
        } else {
            return s;
        }
    }
}
