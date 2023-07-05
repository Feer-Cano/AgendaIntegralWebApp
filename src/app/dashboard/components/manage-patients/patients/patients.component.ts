import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '../../../services/translate.service';
import { Patient } from "../../../models/patient";
import { PatientService } from '../../../services/patient.service';
import { NewPatientComponent } from "./dialogs/new-patient/new-patient.component";

import { Table } from 'primeng/table';

type TranslateData = {
  [key: string]: string;
};
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {

  deletePatientDialog: boolean = false;

  deletePatientsDialog: boolean = false;

  patients: Patient[] = [];

  patient: Patient = {}

  selectedPatients: Patient[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [];
  translatedStrings: TranslateData = {};
  @ViewChild( NewPatientComponent ) dialogPatient!: NewPatientComponent;
  
  constructor(
    private patientService: PatientService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.getTranslations().subscribe((translations: TranslateData) => {
      this.translatedStrings = translations;
    });


    this.patientService.getPatients().subscribe( (result: Patient[]) => {
      this.patients = result;
    });
  
  }
  
  openNew() {
    
    this.dialogPatient.patient = {};
    this.dialogPatient.submitted = false;
    this.dialogPatient.patientDialog = true;

    this.dialogPatient.patientCreated.subscribe( (newPatient: Patient) => {
      if ( newPatient ) {
        this.patientService.getPatients().subscribe( (result: Patient[]) => {
          this.patients = result;
        });
      }
    });
  }

  deleteSelectedPatients() {
    this.deletePatientsDialog = true;
  }

  editPatient(patient: Patient) {
    this.dialogPatient.patient = { ...patient };
    this.dialogPatient.patientDialog = true;
  }

  deletePatient(patient: Patient) {
    this.deletePatientDialog = true;
    this.dialogPatient.patient = { ...patient };
  }

  confirmDeleteSelected() {
    this.deletePatientsDialog = false;
    this.patients = this.patients.filter(val => !this.selectedPatients.includes(val));
    this.selectedPatients = [];
  }

  confirmDelete() {
    this.deletePatientDialog = false;
    this.patients = this.patients.filter(val => val.id !== this.dialogPatient.patient.id);
    this.dialogPatient.patient = {};
  }

  findIndexById(id: number): number {
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
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
