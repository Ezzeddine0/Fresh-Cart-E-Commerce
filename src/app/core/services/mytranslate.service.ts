import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MytranslateService {
  private readonly _TranslateService = inject(TranslateService);
  constructor() {
    // 1- get lang
    let savedLang = localStorage.getItem('lang');

    // 2- set def lang
    this._TranslateService.setDefaultLang('en');

    // 3- Use Lang
    this._TranslateService.use(savedLang!);
    this.changeDirection();
  }

  changeDirection() {
    let savedLang = localStorage.getItem('lang');
    if (savedLang == 'en') {
      document.documentElement.dir = 'ltr';
    } else if (savedLang == 'ar') {
      document.documentElement.dir = 'rtl';
    }
  }
}
