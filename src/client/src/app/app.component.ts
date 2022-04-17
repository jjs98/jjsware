import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  private readonly english: string = 'en';
  private readonly german: string = 'de';
  public languages: string[] = [this.english, this.german];

  public currentLanguage: string;

  constructor(private _translate: TranslateService) {
    this.currentLanguage = this.english;
    _translate.setDefaultLang(this.currentLanguage);
    _translate.use(this.currentLanguage);
  }

  public switchLanguage(language: string): void {
    if (this._translate.currentLang != language) {
      this._translate.use(language);
      this.currentLanguage = language;
    }
  }
}
