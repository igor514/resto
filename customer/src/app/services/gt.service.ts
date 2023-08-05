import {Inject, Injectable} from "@angular/core";
import * as Cookies from 'js-cookie';
import {DOCUMENT} from "@angular/common";
import {environment} from "src/environments/environment";

declare var google: any;

const RTL_LANGS = ['ar'];

// google translate
@Injectable()
export class GTService {
  public originalLang: string = 'en'; // язык, с которого переводим
  public currentLang: string = null; // язык, на который переводим

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  public prepare(): void {
    let script = document.createElement("script");
    script.src = `//translate.google.com/translate_a/element.js?cb=gtInit`;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  public init(): void {
    this.currentLang = this.getCookieLang() || this.originalLang;

    this.document.dir = RTL_LANGS.includes(this.currentLang) ? 'rtl' : 'ltr'

    if (this.currentLang !== this.originalLang) { // на язык оригинала перевод не нужен
      new google.translate.TranslateElement({pageLanguage: this.originalLang});
    }
  }

  private getCookieLang(): string {
    return Cookies.get("googtrans") !== undefined ? Cookies.get("googtrans").split("/")[2] : null;
  }

  public translate(lang): void {
    const value = "/" + this.originalLang + "/" + lang;

    Cookies.set("googtrans", value);
    if (environment.production) {
      const domain = environment.cookieDomainRoot;
      Cookies.set("googtrans", value, {domain});
    }
    window.location.reload();
  }
}
