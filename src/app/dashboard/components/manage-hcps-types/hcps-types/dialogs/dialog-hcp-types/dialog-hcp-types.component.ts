import { HcpTypesService } from './../../../../../services/hcp-types.service';
import { Component,LOCALE_ID, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  HcpTypes } from '../../../../../models/hcp-types';
import * as moment from 'moment';
import localeEsMX from '@angular/common/locales/es-MX';
import { TranslateData } from '../../../../../interfaces/translate-data';
import { TranslateService } from '../../../../../services/translate.service';
registerLocaleData( localeEsMX );

@Component({
  selector: 'app-dialog-hcp-types',
  templateUrl: './dialog-hcp-types.component.html',
  styleUrls: ['./dialog-hcp-types.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
})
export class DialogHcpTypesComponent {

  datePipe: DatePipe = new DatePipe('es-MX');
  @Output() hcpTypesEmitter: EventEmitter<HcpTypes> = new EventEmitter<HcpTypes>();

  translatedStrings: TranslateData= {};

  form: FormGroup;

  hcpTypesDialog: boolean = false;

  submitted: boolean = false;

  hcpTypes: HcpTypes = {};

  entities: any[] = [];

  birthSex: any[] = [];

  typeDialog: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private hcpTypesService: HcpTypesService,
    private TranslateService: TranslateService
  ) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.TranslateService.getTranslations().subscribe( ( translations: TranslateData ) => {
      this.translatedStrings = translations;
    });
  }

  setValuesForm() {
    this.form.patchValue({
      name: this.hcpTypes.name,
    });
  }

  resetForm() {
    this.form.patchValue({
      name: '',
    });
  }

  save() {

    this.submitted = false;

    if ( this.form.invalid ) {
      this.submitted = true;
      return;
    }

    const formValues = this.form.getRawValue();

    this.hcpTypes.name = formValues.name;

    if (this.typeDialog === 'new' ) {
      this.hcpTypesService.createHcpTypes( this.hcpTypes ).subscribe( (result: HcpTypes) => {
        this.hcpTypesEmitter.next( result );
      });
    }else{

    this.hcpTypesService.updateHcpType( this.hcpTypes ).subscribe( (result: HcpTypes) => {
      this.hcpTypesEmitter.next( result );
    });
  }

    this.hideDialog();

  }

  hideDialog() {
    this.form.reset();
    this.hcpTypesDialog = false;
    this.submitted = false;
  }
}
