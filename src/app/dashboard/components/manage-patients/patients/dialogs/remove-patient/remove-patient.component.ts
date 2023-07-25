import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateData } from 'src/app/dashboard/interfaces/translate-data';

import { Patient } from 'src/app/dashboard/models/patient';

import { TranslateService } from 'src/app/dashboard/services/translate.service';
import { PatientService } from "../../../../../services/patient.service";
import { AlertsService } from '../../../../../services/alerts.service';

@Component({
  selector: 'app-remove-patient',
  templateUrl: './remove-patient.component.html',
  styleUrls: ['./remove-patient.component.scss'],
  providers: [MessageService, AlertsService]
})
export class RemovePatientComponent {

  @Output() patientEmitter: EventEmitter<Patient> = new EventEmitter<Patient>();

  translatedStrings: TranslateData = {};

  patient: Patient = {};

  submitted: boolean = false;

  removePatientsDialog: boolean = false;

  removePatientDialog: boolean = false;

  confirmationText: string = '';

  constructor(
    public patientService: PatientService,
    private alertsService: AlertsService,
    private translateService: TranslateService,
  ){}

  ngOnInit() {

    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translatedStrings = translations;
    });
  }

  confirmDelete() {

    if ( this.confirmationText === 'eliminar' && this.patient.id ) {
      this.patientService.removePatient( this.patient.id ).subscribe({
        next: (result) => {
          this.alertsService.alertsPatient.Remove();
          this.patientEmitter.next( result );
        },
        error: () => {
          this.alertsService.alertsPatient.Error();
        }
      })
    } else {
      this.alertsService.alertsPatient.Error();
    }

    this.onClose();
  }

  onClose() {
    this.removePatientDialog = false;
    this.confirmationText = '';
  }

  // confirmDeleteSelected() {
  //   this.removePatientsDialog = false;
  //   this.patients = this.patients.filter(val => !this.selectedPatients.includes( val ));
  //   this.selectedPatients = [];
  // }


}

