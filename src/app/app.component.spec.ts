import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LanguageService } from './services/language.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;

  beforeEach(async () => {
    const languageServiceSpyObj = jasmine.createSpyObj('LanguageService', [
      'switchLanguage'
    ]);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: LanguageService, useValue: languageServiceSpyObj }]
    }).compileComponents();

    languageServiceSpy = TestBed.inject(
      LanguageService
    ) as jasmine.SpyObj<LanguageService>;

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language on switchLanguage call', () => {
    const language = 'de';
    component.switchLanguage(language);
    expect(languageServiceSpy.switchLanguage).toHaveBeenCalledWith(language);
  });

  it('should toggle side nav on toggleSideNav call', fakeAsync(() => {
    spyOn(component.sidenav, 'toggle');
    component.toggleSideNav();
    tick(1000);
    expect(component.sidenav.toggle).toHaveBeenCalled();
  }));

  it('should set isDarkTheme to true when loaded', () => {
    expect(component.isDarkTheme).toBeTrue();
    expect(localStorage.getItem('theme')).toBeNull();
  });

  it('should set theme key to light-theme when switched first time', () => {
    expect(localStorage.getItem('theme')).toBeNull();
    component.switchTheme();
    expect(localStorage.getItem('theme')).toEqual('light-theme');
  });

  it('should set theme key to dark-theme when switched from light-theme', () => {
    localStorage.setItem('theme', 'light-theme');
    component.switchTheme();
    expect(localStorage.getItem('theme')).toEqual('dark-theme');
  });

  it('should set theme key to light-theme when switched from dark-theme', () => {
    localStorage.setItem('theme', 'dark-theme');
    component.switchTheme();
    expect(localStorage.getItem('theme')).toEqual('light-theme');
  });
});
