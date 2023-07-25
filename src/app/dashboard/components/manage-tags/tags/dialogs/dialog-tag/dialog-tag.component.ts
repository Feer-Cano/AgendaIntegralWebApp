import { Component,LOCALE_ID, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagService } from '../../../../../services/tag.service';
import { Tag } from '../../../../../models/tag';

import * as moment from 'moment';
import localeEsMX from '@angular/common/locales/es-MX';
import { TranslateData } from '../../../../../interfaces/translate-data';
import { TranslateService } from '../../../../../services/translate.service';
registerLocaleData( localeEsMX );

@Component({
  selector: 'app-dialog-tag',
  templateUrl: './dialog-tag.component.html',
  styleUrls: ['./dialog-tag.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
})
export class DialogTagComponent implements OnInit{

  datePipe: DatePipe = new DatePipe('es-MX');
  @Output() tagEmitter: EventEmitter<Tag> = new EventEmitter<Tag>();

  translatedStrings: TranslateData= {};

  form: FormGroup;

  tagDialog: boolean = false;

  submitted: boolean = false;

  tag: Tag = {};

  entities: any[] = [];

  birthSex: any[] = [];

  typeDialog: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private tagService: TagService,
    private TranslateService: TranslateService
  ) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      entities: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.TranslateService.getTranslations().subscribe( ( translations: TranslateData ) => {
      this.translatedStrings = translations;
    });
    this.entities = this.tagService.entities;
  }

  setValuesForm() {
    this.form.patchValue({
      name: this.tag.name,
      entities: Number( this.tag.typeEntityId?.id),
    });
  }

  resetForm() {
    this.form.patchValue({
      name: '',
      entities: null,
    });
  }

  save() {

    this.submitted = false;

    if ( this.form.invalid ) {
      this.submitted = true;
      return;
    }

    const formValues = this.form.getRawValue();

    this.tag.name = formValues.name;
    this.tag.typeEntityId = formValues.entities;

    if (this.typeDialog === 'new' ) {
      this.tagService.createTags( this.tag ).subscribe( (result: Tag) => {
        this.tagEmitter.next( result );
      });
    }else{

    this.tagService.updateTag( this.tag ).subscribe( (result: Tag) => {
      this.tagEmitter.next( result );
    });
  }

    this.hideDialog();

  }

  hideDialog() {
    this.form.reset();
    this.tagDialog = false;
    this.submitted = false;
  }
}
