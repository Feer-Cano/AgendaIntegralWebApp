
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { TranslateData } from "src/app/dashboard/interfaces/translate-data";

import { TranslateService } from 'src/app/dashboard//services/translate.service';
import { Service } from "src/app/dashboard/models/service";
import { ServiceService } from "src/app/dashboard/services/service.service";

@Component({
  selector: 'app-dialog-service',
  templateUrl: './dialog-service.component.html',
  styleUrls: ['./dialog-service.component.scss']
})
export class DialogServiceComponent implements OnInit {

  @Output() serviceEmitter: EventEmitter<Service> = new EventEmitter<Service>();

  translator: TranslateData = {};

  form: FormGroup;

  serviceDialog: boolean = false;

  submitted: boolean = false;

  service: Service = {};

  typeDialog: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private serviceService: ServiceService
  ) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translator = translations;
    });
  }

  setValuesForm() {
    this.form.patchValue({
      name: this.service.name,
      description: this.service.description,
      isActive: 1
    });
  }

  resetForm() {
    this.form.patchValue({
      firstName: '',
      lastName: '',
      birthSex: '',
      birthDate: null,
      maritalStatus: '',
      isActive: null
    });
  }

  save() {

    this.submitted = false;

    if ( this.form.invalid ) {
      this.submitted = true;
      return;
    }

    const formValues = this.form.getRawValue();

    this.service.name = formValues.name;
    this.service.description = formValues.description;

    if ( this.typeDialog === 'new' ) {

      this.serviceService.createService( this.service ).subscribe( (result: Service) => {
        this.serviceEmitter.next( result );
      });

    } else {
      
      this.serviceService.updateService( this.service ).subscribe( (result: Service) => {
        this.serviceEmitter.next( result );
      });
    }

    this.hideDialog();
  }

  hideDialog() {
    this.form.reset();
    this.serviceDialog = false;
    this.submitted = false;
  }



}
