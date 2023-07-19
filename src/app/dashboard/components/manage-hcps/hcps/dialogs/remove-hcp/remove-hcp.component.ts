import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateData } from 'src/app/dashboard/interfaces/translate-data';

import { Hcp } from 'src/app/dashboard/models/hcp';

import { TranslateService } from 'src/app/dashboard/services/translate.service';
import { HcpService } from "../../../../../services/hcp.service";
import { AlertsService } from '../../../../../services/alerts.service';

@Component({
  selector: 'app-remove-hcp',
  templateUrl: './remove-hcp.component.html',
  styleUrls: ['./remove-hcp.component.scss'],
  providers: [AlertsService],
})
export class RemoveHcpComponent {

  @Output() hcpEmitter: EventEmitter<Hcp> = new EventEmitter<Hcp>();

  translatedStrings: TranslateData = {};

  hcp: Hcp = {};

  submitted: boolean = false;

  removeHcpsDialog: boolean = false;

  removeHcpDialog: boolean = false;

  confirmationText: string = '';

  constructor(
    public hcpService: HcpService,
    private translateService: TranslateService,
    private alertsService: AlertsService
  ){}

  ngOnInit() {

    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translatedStrings = translations;
    });
  }

  confirmDelete() {

    if ( this.confirmationText === 'eliminar' && this.hcp.id ) {
      this.hcpService.removeHcp( this.hcp.id ).subscribe({
        next: (result) => {
          this.alertsService.alertsHCP.Warning();
          this.hcpEmitter.next( result );
        },
        error: () => {
          this.alertsService.alertsHCP.Error();
        }
      })
    } else {
      this.alertsService.alertsHCP.Error();
    }

    this.onClose();
  }

  onClose() {
    this.removeHcpDialog = false;
    this.confirmationText = '';
  }

  // confirmDeleteSelected() {
  //   this.removeHcpsDialog = false;
  //   this.hcps = this.hcps.filter(val => !this.selectedHcps.includes( val ));
  //   this.selectedHcps = [];
  // }


}
