import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as translateData from '../../../assets/I18N/I18N_ES.json';
import * as inglesData from '../../../assets/I18N/I18N_EN.json';
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
