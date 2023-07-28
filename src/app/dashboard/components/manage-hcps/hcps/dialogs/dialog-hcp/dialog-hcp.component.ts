import { Component, EventEmitter, OnInit, Output, LOCALE_ID} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DatePipe, registerLocaleData } from '@angular/common';
import { Hcp } from '../../../../../models/hcp';
import { HcpService } from '../../../../../services/hcp.service';
import * as moment from 'moment';
import localeEsMX from '@angular/common/locales/es-MX';
import { TranslateService } from '../../../../../services/translate.service';
import { TranslateData } from '../../../../../interfaces/translate-data';
import { HcpTypesService } from '../../../../../services/hcp-types.service';
import { HcpTypes } from '../../../../../models/hcp-types';
registerLocaleData( localeEsMX );

@Component({
  selector: 'app-dialog-hcp',
  templateUrl: './dialog-hcp.component.html',
  styleUrls: ['./dialog-hcp.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
})

export class DialogHcpComponent implements OnInit {

  @Output() hcpEmitter: EventEmitter<Hcp> = new EventEmitter<Hcp>();

  form: FormGroup;

  datePipe: DatePipe = new DatePipe('es-MX');

  hcpDialog: boolean = false;

  submitted: boolean = false;

  hcp: Hcp = {};

  type: any[] = [];

  hcpTypes: HcpTypes[] = [];

  birthSex: any[] = [];

  typeDialog: string = '';

  translatedStrings: TranslateData = {};

  constructor(
    private formBuilder: FormBuilder,
    private hcpService: HcpService,
    private translateService: TranslateService,
    private hcpTypesService:HcpTypesService
  ) {

    this.form = this.formBuilder.group({
      hcpTypeId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthSex: ['', [Validators.required]],
      birthDate: ['', Validators.required],
      professionalLicense: ['', Validators.required],
      type: ['', Validators.required],

    });
  }

  ngOnInit(): void {

    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translatedStrings = translations;
    });

    this.getHcpTypes();

    this.type = this.hcpService.type;
    this.birthSex = this.hcpService.birthSex;

  }

  getHcpTypes(){
    this.hcpTypesService.getHcpTypes(1).subscribe( ( result: HcpTypes[] ) => {
      this.hcpTypes = result;

    } )

  }

  setValuesForm() {

    this.form.patchValue({
      firstName: this.hcp.firstName,
      lastName: this.hcp.lastName,
      birthSex: this.hcp.birthSex,
      birthDate: this.datePipe.transform( this.hcp.birthDate, 'dd/MM/yyyy' ),
      professionalLicense: this.hcp.professionalLicense,
      type: this.hcp.type,
      hcpTypeId: this.hcp.hcpType.id,
      isActive: 1
    });

  }

  resetForm() {
    this.form.patchValue({
      firstName: '',
      lastName: '',
      birthSex: '',
      birthDate: null,
      professionalLicense: '',
      type: '',
      hcpTypeId: null,
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
    this.hcp.firstName = formValues.firstName;
    this.hcp.lastName = formValues.lastName;
    this.hcp.birthSex = formValues.birthSex;
    this.hcp.birthDate = formValues.birthDate;
    this.hcp.professionalLicense = formValues.professionalLicense;
    this.hcp.type = formValues.type;
    this.hcp.hcpTypeId = formValues.hcpTypeId;


    if ( this.typeDialog === 'new' ) {

      this.hcpService.createHcp( this.hcp ).subscribe( (result: Hcp) => {
        this.hcpEmitter.next( result );
      });

    } else {

      this.hcp.birthDate = moment( this.hcp.birthDate, 'YYYY/MM/DD' ).toDate();

      this.hcpService.updateHcp( this.hcp ).subscribe( (result: Hcp) => {
        this.hcpEmitter.next( result );
      });

    }

    this.hideDialog();

  }

  hideDialog() {
    this.form.reset();
    this.hcpDialog = false;
    this.submitted = false;
  }

}
