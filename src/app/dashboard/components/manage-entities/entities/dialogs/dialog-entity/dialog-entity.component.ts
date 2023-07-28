import { Component,LOCALE_ID, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntityService } from '../../../../../services/entity.service';
import { Entity } from '../../../../../models/entity';
import * as moment from 'moment';
import localeEsMX from '@angular/common/locales/es-MX';
import { TranslateData } from '../../../../../interfaces/translate-data';
import { TranslateService } from '../../../../../services/translate.service';

registerLocaleData( localeEsMX );

@Component({
  selector: 'app-dialog-entity',
  templateUrl: './dialog-entity.component.html',
  styleUrls: ['./dialog-entity.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
})
export class DialogEntityComponent implements OnInit{

  datePipe: DatePipe = new DatePipe('es-MX');
  @Output() entityEmitter: EventEmitter<Entity> = new EventEmitter<Entity>();

  translatedStrings: TranslateData= {};

  form: FormGroup;

  entityDialog: boolean = false;

  submitted: boolean = false;

  entity: Entity = {};

  typeDialog: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private entityService: EntityService,
    private TranslateService: TranslateService,
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
    console.log(this.entity.name);
    this.form.patchValue({
      name: this.entity.name,
    });
  }

  save() {

    this.submitted = false;

    if ( this.form.invalid ) {
      this.submitted = true;
      return;
    }

    const formValues = this.form.getRawValue();
    this.entity.name = formValues.name;

    if (this.typeDialog === 'new' ) {

      this.entityService.createEntity( this.entity ).subscribe( (result: Entity) => {
        this.entityEmitter.next( result );
      });
    }else{

    this.entityService.updateEntity( this.entity ).subscribe( (result: Entity) => {
      this.entityEmitter.next( result );
    });
  }

    this.hideDialog();

  }

  hideDialog() {
    this.form.reset();
    this.entityDialog = false;
    this.submitted = false;
  }
}
