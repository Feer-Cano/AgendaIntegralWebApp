import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateData } from 'src/app/dashboard/interfaces/translate-data';
import { TranslateService } from 'src/app/dashboard/services/translate.service';
import { AlertsService } from '../../../../../services/alerts.service';
import { HcpTypes } from '../../../../../models/hcp-types';
import { HcpTypesService } from '../../../../../services/hcp-types.service';

@Component({
  selector: 'app-remove-hcp-types',
  templateUrl: './remove-hcp-types.component.html',
  styleUrls: ['./remove-hcp-types.component.scss'],
  providers: [AlertsService],
})
export class RemoveHcpTypesComponent {

  @Output() hcpTypesEmitter: EventEmitter<HcpTypes> = new EventEmitter<HcpTypes>();

  translatedStrings: TranslateData = {};

  hcpTypes: HcpTypes = {};

  submitted: boolean = false;

  removeHcpTypesDialog: boolean = false;

  removeHcpTypeDialog: boolean = false;

  confirmationText: string = '';

  constructor(
    public hcpTypesService: HcpTypesService,
    private translateService: TranslateService,
    private alertsService: AlertsService
  ){}

  ngOnInit() {

    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translatedStrings = translations;
    });
  }

  confirmDelete() {

    if ( this.confirmationText === 'eliminar' && this.hcpTypes.id ) {
      this.hcpTypesService.removeHcpType( this.hcpTypes.id ).subscribe({
        next: (result) => {
          this.alertsService.alertsHcpTypes.Warning();
          this.hcpTypesEmitter.next( result );
        },
        error: () => {
          this.alertsService.alertsHcpTypes.Error();
        }
      })
    } else {
      this.alertsService.alertsHcpTypes.Error();
    }

    this.onClose();
  }

  onClose() {
    this.removeHcpTypesDialog = false;
    this.confirmationText = '';
  }

  // confirmDeleteSelected() {
  //   this.removeHcpsDialog = false;
  //   this.hcps = this.hcps.filter(val => !this.selectedHcps.includes( val ));
  //   this.selectedHcps = [];
  // }


}
