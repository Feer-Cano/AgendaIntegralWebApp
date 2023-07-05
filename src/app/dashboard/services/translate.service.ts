import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as translateData from './translate.json';
import * as inglesData from './ingles.json';
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
