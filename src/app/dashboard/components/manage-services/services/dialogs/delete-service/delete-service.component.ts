import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateData } from 'src/app/dashboard/interfaces/translate-data';

import { Service } from 'src/app/dashboard/models/service';

import { TranslateService } from 'src/app/dashboard/services/translate.service';
import { ServiceService } from "src/app/dashboard/services/service.service";
import { AlertsService } from '../../../../../services/alerts.service';

@Component({
  selector: 'app-delete-service',
  templateUrl: './delete-service.component.html',
  styleUrls: ['./delete-service.component.scss'],
  providers: [AlertsService]
})
export class DeleteServiceComponent {

  @Output() serviceEmitter: EventEmitter<Service> = new EventEmitter<Service>();

  translator: TranslateData = {};

  service: Service = {};

  submitted: boolean = false;

  deleteServicesDialog: boolean = false;

  deleteServiceDialog: boolean = false;

  confirmationText: string = '';

  constructor(
    public serviceService: ServiceService,
    private alertsService: AlertsService,
    private translateService: TranslateService,
  ){}

  ngOnInit() {

    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translator = translations;
    });
  }

  confirmDelete() {

    if ( this.confirmationText === 'eliminar' && this.service.id ) {

      this.serviceService.removeService( this.service ).subscribe({
        next: (result) => {
          this.alertsService.alertsService.Warning();
          this.serviceEmitter.next( result );
        },
        error: () => {
          this.alertsService.alertsService.Error();
        }
      })
    } else {
      this.alertsService.alertsService.Error();
    }

    this.onClose();
  }

  onClose() {
    this.deleteServiceDialog = false;
    this.confirmationText = '';
  }

}
