
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Patient } from "../../../../../models/patient";
import { PatientService } from "../../../../../services/patient.service";

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  @Output() patientCreated: EventEmitter<Patient> = new EventEmitter<Patient>();

  form: FormGroup;

  patientDialog: boolean = false;

  submitted: boolean = false;

  patient: Patient = {};

  maritalStatus: any[] = [];

  birthSex: any[] = [];

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
    
    this.patientService.createPatient( this.patient ).subscribe( result => {

      this.patientCreated.emit(result);
      this.form.reset();
      
    });

    this.hideDialog();

  }
  
  hideDialog() {
    this.patientDialog = false;
    this.submitted = false;
  }

}
