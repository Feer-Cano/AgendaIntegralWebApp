import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { take } from 'rxjs';

import { TranslateData } from "../../../interfaces/translate-data";
import { Patient } from "../../../models/patient";

import { DialogPatientComponent } from "./dialogs/dialog-patient/dialog-patient.component";
import { RemovePatientComponent } from "./dialogs/remove-patient/remove-patient.component";

import { PatientService } from '../../../services/patient.service';
import { TranslateService } from '../../../services/translate.service';
import { AlertsService } from '../../../services/alerts.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers: [AlertsService, MessageService]
})
export class PatientsComponent {

  removePatientDialog: boolean = false;

  deletePatientsDialog: boolean = false;

  patients: Patient[] = [];

  patient: Patient = {}

  selectedPatients: Patient[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [];

  birthSex: any[] = [];

  translatedStrings: TranslateData = {};

  @ViewChild( DialogPatientComponent ) dialogPatient!: DialogPatientComponent;
  @ViewChild( RemovePatientComponent ) dialogRemovePatient!: RemovePatientComponent;

  constructor(
    private patientService: PatientService,
    private alertsService: AlertsService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {

    this.birthSex = this.patientService.birthSex;

    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translatedStrings = translations;
    });

    this.reloadTable();
  }

  reloadTable() {
    this.patientService.getPatients( 1 ).subscribe( (result: Patient[]) => {
      this.patients = result;
    });
  }

  dialogNewPatient() {

    this.dialogPatient.resetForm();
    this.dialogPatient.typeDialog = 'new';
    this.dialogPatient.patient = new Patient({ isActive: 1 });
    this.dialogPatient.submitted = false;
    this.dialogPatient.patientDialog = true;

    this.dialogPatient.patientEmitter.pipe( take(1) ).subscribe( (patient: Patient) => {
      patient ? ( this.alertsService.alertsPatient.Insert(), this.reloadTable() ) : this.alertsService.alertsPatient.Error();
    });
  }

  dialogEditPatient( patient: Patient ) {

    this.dialogPatient.typeDialog = 'edit';
    this.dialogPatient.patient = { ...patient };
    this.dialogPatient.patientDialog = true;
    this.dialogPatient.setValuesForm();

    this.dialogPatient.patientEmitter.pipe( take(1) ).subscribe( (patient: Patient) => {
      patient ? ( this.alertsService.alertsPatient.Update(), this.reloadTable() ) :  this.alertsService.alertsPatient.Error();
    });
  }

  deleteSelectedPatients() {
    this.deletePatientsDialog = true;
  }

  dialogDeletePatient( patient: Patient ) {
    this.dialogRemovePatient.removePatientDialog = true;
    this.dialogRemovePatient.patient = { ...patient };

    this.dialogRemovePatient.patientEmitter.pipe( take(1) ).subscribe( (result: any) => {
      if ( result.id ) {
        this.reloadTable();
      }
    });
  }

  findIndexById( id: number ): number {
    let index = -1;
    for (let i = 0; i < this.patients.length; i++) {
      if (this.patients[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal( (event.target as HTMLInputElement).value, 'contains' );
  }

  getMaritalStatusLabel( value: string ): string {
    const status = this.patientService.maritalStatus.find( item => item.value === value );
    return status ? status.label : '';
  }
}
