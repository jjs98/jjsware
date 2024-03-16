import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent
} from '@angular/material/sidenav';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LanguageService } from './services/language.service';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenav,
    NgIf,
    MatDivider,
    MatButton,
    RouterLink,
    MatIcon,
    MatSidenavContent,
    MatToolbar,
    MatIconButton,
    MatMenuTrigger,
    RouterOutlet,
    MatMenu,
    MatMenuItem,
    NgFor,
    TranslateModule
  ]
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public isDarkTheme = true;
  public isSideNavOpen = false;

  public constructor(private _languageService: LanguageService) {}

  public ngOnInit(): void {
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
