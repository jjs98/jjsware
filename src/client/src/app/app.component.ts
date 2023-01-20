import { Component, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
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
  public availableLanguages: string[] = [this.english, this.german];

  public currentLanguage: string;
  public isDarkTheme: boolean = true;

  constructor(private _translate: TranslateService) {
    this.currentLanguage = this.english;
    _translate.setDefaultLang(this.currentLanguage);
    _translate.use(this.currentLanguage);
  }

  public switchLanguage(language: string): void {
    if (language && this._translate.currentLang != language) {
      this._translate.use(language);
      this.currentLanguage = language;
    }
  }

  public getMode(): MatDrawerMode {
    return this.isMobileView() ? 'over' : 'side';
  }

  public getTheme(): string {
    var theme = localStorage.getItem('theme');
    if (theme == 'light-theme') {
      this.isDarkTheme = false;
      return theme;
    }
    else
    {
      this.isDarkTheme = true;
      return 'dark-theme';
    }
  }
  
  public switchTheme(): void {
    var theme = this.getTheme();
    if (theme == 'dark-theme'){
      localStorage.setItem('theme', 'light-theme');
    }
    else {
      localStorage.setItem('theme', 'dark-theme');
    }
  }

  public navItemClicked(): void {
    if (this.getMode() == 'over') {
      this.sidenav.close();
    }
  }

  public isMobileView(): boolean {
    return window.innerWidth < 600;
  }
}
