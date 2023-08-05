import { Injectable } from "@angular/core";

@Injectable()
export class YTService {
    public originalLang: string = null; // язык, с которого переводим   
    public currentLang: string = null; // язык, на который переводим    

    public init(): void {
        this.currentLang = this.getStorageLang() || this.originalLang;

        if (this.currentLang !== this.originalLang) {
            let script = document.createElement('script');
            script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${this.originalLang}&widgetTheme=light&autoMode=false`;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    }

    private getStorageLang(): string { // язык на который переводим        
        return localStorage["yt-widget"] ? JSON.parse(localStorage["yt-widget"]).lang : null;
    }

    private setStorageLang(lang: string): void {
        localStorage.setItem('yt-widget', JSON.stringify({lang, active: true}));
    }

    public translate(lang): void {
        this.setStorageLang(lang);
        window.location.reload();
    }   
}