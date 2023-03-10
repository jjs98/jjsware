import { LanguageService } from './services/language.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PrimeNGConfig, PrimeIcons, MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public isDarkTheme = true;
  public isSideNavOpen = false;

  public items: MenuItem[] = [
    {
      label: 'language',
      icon: PrimeIcons.LANGUAGE,
      items: [{ label: 'en' }, { label: 'de' }],
    },
    { 
      label: 'theme',
      command: () => this.switchTheme()
    },
  ];

  public constructor(
    private primengConfig: PrimeNGConfig,
    private _languageService: LanguageService
  ) {}

  public ngOnInit(): void {
    this.primengConfig.ripple = true;

    const sideNavOpen = localStorage.getItem('side-nav');
    if (sideNavOpen == 'open') {
      this.isSideNavOpen = true;
    }
  }

  public getAvailableLanguages(): string[] {
    return this._languageService.availableLanguages;
  }

  public switchLanguage(language: string): void {
    this._languageService.switchLanguage(language);
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
    const themeElement = document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (theme == 'dark-theme') {
      localStorage.setItem('theme', 'light-theme');
      themeElement.href = 'light.css';
    } else {
      localStorage.setItem('theme', 'dark-theme');
      themeElement.href = 'dark.css';
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
