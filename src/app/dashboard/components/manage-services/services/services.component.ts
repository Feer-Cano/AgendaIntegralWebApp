import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { take } from 'rxjs';

import { TranslateData } from "src/app/dashboard/interfaces/translate-data";
import { Service } from "src/app/dashboard/models/service";

import { DialogServiceComponent } from "./dialogs/dialog-service/dialog-service.component";
import { DeleteServiceComponent } from "./dialogs/delete-service/delete-service.component";

import { ServiceService } from 'src/app/dashboard/services/service.service';
import { TranslateService } from 'src/app/dashboard/services/translate.service';
import { AlertsService } from 'src/app/dashboard/services/alerts.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [AlertsService, MessageService]
})
export class ServicesComponent {

  translator: TranslateData = {};

  removeServiceDialog: boolean = false;

  deleteServicesDialog: boolean = false;

  services: Service[] = [];

  service: Service = {}

  selectedServices: Service[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [];

  @ViewChild( DialogServiceComponent ) dialogService!: DialogServiceComponent;
  @ViewChild( DeleteServiceComponent ) dialogDeleteService!: DeleteServiceComponent;

  constructor(
    private serviceService: ServiceService,
    private alertsService: AlertsService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {


    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translator = translations;
    });

    this.reloadTable();
  }

  reloadTable() {
    this.serviceService.getServices( 1 ).subscribe( (result: Service[]) => {
      this.services = result;
    });

  }

  dialogNewService() {

    this.dialogService.typeDialog = 'new';
    this.dialogService.service = new Service({ isActive: 1 });
    this.dialogService.submitted = false;
    this.dialogService.serviceDialog = true;

    this.dialogService.serviceEmitter = new EventEmitter<Service>();
    this.dialogService.serviceEmitter.subscribe( (service: Service) => {
      service ? ( this.alertsService.alertsService.Insert(), this.reloadTable() ) : this.alertsService.alertsService.Error();
    });
  }

  dialogEditService( service: Service ) {

    this.dialogService.typeDialog = 'edit';
    this.dialogService.service = { ...service };
    this.dialogService.serviceDialog = true;
    this.dialogService.setValuesForm();

    this.dialogService.serviceEmitter = new EventEmitter<Service>();

    this.dialogService.serviceEmitter.subscribe( (service: Service) => {
      service ? ( this.alertsService.alertsService.Update(), this.reloadTable() ) : this.alertsService.alertsService.Error();
    });
  }

  deleteSelectedServices() {
    this.deleteServicesDialog = true;
  }

  dialogDelService( service: Service ) {

    this.dialogDeleteService.deleteServiceDialog = true;
    this.dialogDeleteService.service = { ...service };

    this.dialogService.serviceEmitter = new EventEmitter<Service>();

    this.dialogDeleteService.serviceEmitter.subscribe( (result: any) => {
      if ( result.id ) {
        this.reloadTable();
      }
    });
  }

  findIndexById( id: number ): number {
    let index = -1;
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal( (event.target as HTMLInputElement).value, 'contains' );
  }

}
