import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateData } from "../interfaces/translate-data";
import { TranslateService } from './translate.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  translatedStrings: TranslateData = {};

  constructor(
      private messageService: MessageService,
      private translateService: TranslateService,
    )
    {
      this.translateService.getTranslations().subscribe( ( translations: TranslateData ) => {
      this.translatedStrings = translations;
      });
    }

  showWarning(detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'ADVERTENCIA!',
      detail: detail,
    });
  }
    showError(detail: string){
      this.messageService.add({
        severity: 'error',
        summary: 'ERROR!',
        detail: detail,
      });
    }

    showSuccess(detail: string){
      this.messageService.add({
        severity: 'success',
        summary: 'EXITOSO!',
        detail: detail,
      });
    }

    alertsHCP = {
      Warning: () => this.showWarning(this.translatedStrings['hcps']['warning']),
      Insert: () => this.showSuccess(this.translatedStrings['hcps']['insert']),
      Update: () => this.showSuccess(this.translatedStrings['hcps']['update']),
      Error: () => this.showError(this.translatedStrings['hcps']['error']),
    };

    alertsTag = {
      Warning: () => this.showWarning(this.translatedStrings['tags']['warning']),
      Insert: () => this.showSuccess(this.translatedStrings['tags']['insert']),
      Update: () => this.showSuccess(this.translatedStrings['tags']['update']),
      Error: () => this.showError(this.translatedStrings['tags']['error']),
    };

    alertsPatient = {
      Warning: () => this.showWarning(this.translatedStrings['patients']['warning']),
      Insert: () => this.showSuccess(this.translatedStrings['patients']['insert']),
      Update: () => this.showSuccess(this.translatedStrings['patients']['update']),
      Error: () => this.showError(this.translatedStrings['patients']['error']),
    };
}
