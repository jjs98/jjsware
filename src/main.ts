import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AboutComponent } from './app/components/about/about.component';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MyWorkComponent } from './app/components/my-work/my-work.component';
import { SkillsComponent } from './app/components/skills/skills.component';
import { TestComponent } from './app/components/test/test.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from './environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      MatButtonModule,
      MatCardModule,
      MatDateFnsModule,
      MatDatepickerModule,
      MatDividerModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatSelectModule,
      MatSidenavModule,
      MatToolbarModule,
      ReactiveFormsModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([
      { path: '', pathMatch: 'prefix', redirectTo: 'home' },
      { path: 'about', component: AboutComponent },
      { path: 'home', component: HomeComponent },
      { path: 'my-work', component: MyWorkComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'test', component: TestComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ]
}).catch((err) => console.log(err));
