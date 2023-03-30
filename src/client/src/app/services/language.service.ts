import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly english: string = 'en';
  private readonly german: string = 'de';
  private _currentLanguage$: BehaviorSubject<string> = new BehaviorSubject(
    this.english
  );

  public availableLanguages: string[] = [this.english, this.german];

  public get currentLanguage$(): Observable<string> {
    return this._currentLanguage$.asObservable();
  }

  constructor(private _translate: TranslateService) {
    _translate.setDefaultLang(this.english);
    const storageLanguage = localStorage.getItem('locale') ?? this.english;
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
        this._currentLanguage$.next(language);
      }
    }
  }
}
