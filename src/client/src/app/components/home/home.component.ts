import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public getFlexDirection(): string {
    return this.isMobileView() ? 'column' : 'row';
  }

  public isMobileView(): boolean {
    return window.innerWidth < 600;
  }
}
