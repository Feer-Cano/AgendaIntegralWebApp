
import { LOCALE_ID, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Patient } from "../../../../../models/patient";
import { PatientService } from "../../../../../services/patient.service";

import * as moment from 'moment';
import localeEsMX from '@angular/common/locales/es-MX';
registerLocaleData( localeEsMX );

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
})
export class NewPatientComponent implements OnInit {

  datePipe: DatePipe = new DatePipe('es-MX');

  @Output() patientEmitter: EventEmitter<Patient> = new EventEmitter<Patient>();

  form: FormGroup;

  patientDialog: boolean = false;

  submitted: boolean = false;

  patient: Patient = {};

  maritalStatus: any[] = [];

  birthSex: any[] = [];

  typeDialog: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService
  ) {

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthSex: ['', [Validators.required]],
      birthDate: ['', Validators.required],
      maritalStatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.maritalStatus = this.patientService.maritalStatus;
    this.birthSex = this.patientService.birthSex;
  }

  setValuesForm() {
    this.form.patchValue({
      firstName: this.patient.firstName,
      lastName: this.patient.lastName,
      birthSex: this.patient.birthSex,
      birthDate: this.datePipe.transform( this.patient.birthDate, 'dd/MM/yyyy' ),
      maritalStatus: this.patient.maritalStatus,
      isActive: 1
    });
  }

  save() {

    this.submitted = false;

    if ( this.form.invalid ) {
      this.submitted = true;
      return;
    }

    const formValues = this.form.getRawValue();

    this.patient.firstName = formValues.firstName;
    this.patient.lastName = formValues.lastName;
    this.patient.birthSex = formValues.birthSex;
    this.patient.birthDate = formValues.birthDate;
    this.patient.maritalStatus = formValues.maritalStatus;

    if ( this.typeDialog === 'new' ) {
      this.patientService.createPatient( this.patient ).subscribe( (result: Patient) => {
        this.patientEmitter.emit( result );
      });
    } else {

      this.patient.birthDate = moment(this.patient.birthDate, 'DD/MM/YYYY').toDate();

      this.patientService.updatePatient( this.patient ).subscribe( (result: Patient) => {
        this.patientEmitter.emit( result );
      });
    }

    this.hideDialog();
  }
  
  hideDialog() {

    this.form.reset();
    this.patientDialog = false;
    this.submitted = false;
  }

}
