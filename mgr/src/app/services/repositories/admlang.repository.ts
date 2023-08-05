import {Inject, Injectable} from "@angular/core";
import { DataService } from '../data.service';
import { AdmLang } from '../../model/admlang.model';
import {DOCUMENT} from "@angular/common";

@Injectable()
export class AdmLangRepository {
    private currentLangName: string | null = null;
    public langs: AdmLang[] = [];
    public currentLang: AdmLang | null = null;

    constructor(private dataService: DataService, @Inject(DOCUMENT) private document: Document) {
        let langName: string = localStorage.getItem("lang") || "en";
        this.currentLangName = langName ? langName : null;
    }

    private setDirection(lang: AdmLang): void {
      this.document.dir = lang.dir === 'rtl' ? 'rtl' : 'ltr';
    }

    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.admlangs().subscribe(res => {
                if (res.length) {
                    this.langs = res.map(r => new AdmLang().build(r));

                    if (this.currentLangName) {
                        this.currentLang = this.langs.find(l => l.name === this.currentLangName);
                    } else {
                        this.currentLang = this.langs[0];
                        this.currentLangName = this.currentLang.name;
                        this.save();
                    }
                    this.setDirection(this.currentLang);

                    resolve();
                } else {
                    reject("No langs");
                }
            }, err => {
                reject(err);
            });
        });
    }

    public save(): void {
        localStorage.setItem("lang", this.currentLangName);
    }

    public setCurrentLang(langName: string): void {
        let lang: AdmLang | null = this.langs.find(l => l.name === langName) || null;

        if (lang) {
            this.currentLang = lang;
            this.currentLangName = lang.name;
            this.setDirection(this.currentLang);
            this.save();
        }
    }
}
