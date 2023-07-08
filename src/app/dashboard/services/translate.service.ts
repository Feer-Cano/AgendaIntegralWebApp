import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as translateData from '../../../assets/i18n/i18n-es.json';
import * as inglesData from '../../../assets/i18n/i18n-en.json';
type TranslateData = {
  [key: string]: string;
};

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  translations: TranslateData = translateData;

  getTranslations(): Observable<TranslateData> {
    return of(this.translations);
  }
}
