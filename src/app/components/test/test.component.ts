import {
  MatAnchor,
  MatButton,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton
} from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {
  MatFormField,
  MatHint,
  MatLabel,
  MatSuffix
} from '@angular/material/form-field';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from './../../services/language.service';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepickerInput,
    FormsModule,
    MatHint,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepicker,
    MatCardSubtitle,
    MatDivider,
    MatButton,
    MatAnchor,
    MatIconButton,
    MatIcon,
    MatFabButton,
    MatMiniFabButton,
    TranslateModule
  ]
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
      weekday: 'short'
    };
    this.dateAsString = new Intl.DateTimeFormat(
      currentLanguage,
      options
    ).format(this.date);
  }
}
