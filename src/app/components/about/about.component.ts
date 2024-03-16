import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle
} from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatDivider,
    MatList,
    MatListItem,
    MatAnchor,
    TranslateModule
  ]
})
export class AboutComponent {}
