import { Injectable, WritableSignal, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly english: string = 'en';
  private readonly german: string = 'de';
  private currentLanguage: WritableSignal<string> = signal(this.english);

  public availableLanguages: string[] = [this.english, this.german];

  constructor(private _translate: TranslateService) {
    const browserLanguage = this.getBrowserLanguage();
    _translate.setDefaultLang(browserLanguage);
    const storageLanguage = localStorage.getItem('locale') ?? browserLanguage;
    this.switchLanguage(storageLanguage);
  }

  public getCurrentLanguage(): string {
    return this._translate.currentLang;
  }

  public switchLanguage(language: string): void {
    if (language && this._translate.currentLang != language) {
      const isLanguageAvailable = this.availableLanguages.includes(language);
      if (isLanguageAvailable) {
        localStorage.setItem('locale', language);
        this._translate.use(language);
        this.currentLanguage.set(language);
      }
    }
  }

  private getBrowserLanguage(): string {
    const browserLanguage = this._translate.getBrowserLang();
    return browserLanguage?.match(/en|de/) ? browserLanguage : this.english;
  }
}
