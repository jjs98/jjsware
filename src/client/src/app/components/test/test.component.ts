import { LanguageService } from './../../services/language.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  public date: Date | undefined = new Date(Date.now());
  public dateAsString = '';

  constructor(private _languageService: LanguageService) {
    this.onDateChanged();
  }

  public getDateFormatString(): string {
    const currentLanguage = this._languageService.getCurrentLanguage();
    if (currentLanguage === 'en') {
      return 'MM/DD/YYYY';
    } else if (currentLanguage === 'de') {
      return 'DD.MM.YYYY';
    }
    return '';
  }

  public onDateChanged() {
    const currentLanguage = this._languageService.getCurrentLanguage();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      weekday: 'short',
    };
    this.dateAsString = new Intl.DateTimeFormat(
      currentLanguage,
      options
    ).format(this.date);
  }
}
