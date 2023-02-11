import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  private readonly english: string = 'en';
  private readonly german: string = 'de';
  public availableLanguages: string[] = [this.english, this.german];

  public isDarkTheme = true;
  public isSideNavOpen = false;

  public constructor(private _translate: TranslateService) {
    _translate.setDefaultLang(this.english);
  }

  public ngOnInit(): void {
    const storageLanguage = localStorage.getItem('locale');
    const language = this.availableLanguages.find(
      (lang) => lang === storageLanguage
    );
    if (language) this._translate.use(language);

    const sideNavOpen = localStorage.getItem('side-nav');
    if (sideNavOpen == 'open') {
      this.isSideNavOpen = true;
    }
  }

  public switchLanguage(language: string): void {
    if (language && this._translate.currentLang != language) {
      this._translate.use(language);
      localStorage.setItem('locale', language);
    }
  }

  public getTheme(): string {
    const theme = localStorage.getItem('theme');
    if (theme == 'light-theme') {
      this.isDarkTheme = false;
      return theme;
    } else {
      this.isDarkTheme = true;
      return 'dark-theme';
    }
  }

  public switchTheme(): void {
    const theme = this.getTheme();
    if (theme == 'dark-theme') {
      localStorage.setItem('theme', 'light-theme');
    } else {
      localStorage.setItem('theme', 'dark-theme');
    }
  }

  public toggleSideNav(): void {
    if (this.sidenav.opened) {
      this.sidenav.close();
      this.setSideNavCache(false);
    } else {
      this.sidenav.open();
      this.setSideNavCache(true);
    }
  }

  public onSideNavOpenChange(isOpen: boolean): void {
    this.setSideNavCache(isOpen);
  }

  public onNavItemClicked(): void {
    if (this.isMobileView()) this.sidenav.close();
  }

  public isMobileView(): boolean {
    return window.innerWidth < 600;
  }

  private setSideNavCache(isOpen: boolean): void {
    localStorage.setItem('side-nav', isOpen ? 'open' : 'closed');
  }
}
