import { Component,LOCALE_ID, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagService } from '../../../../../services/tag.service';
import { Tag } from '../../../../../models/tag';

import * as moment from 'moment';
import localeEsMX from '@angular/common/locales/es-MX';
registerLocaleData( localeEsMX );

@Component({
  selector: 'app-new-tag',
  templateUrl: './new-tag.component.html',
  styleUrls: ['./new-tag.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
})
export class NewTagComponent implements OnInit{

  datePipe: DatePipe = new DatePipe('es-MX');
  @Output() tagEmitter: EventEmitter<Tag> = new EventEmitter<Tag>();

  form: FormGroup;

  tagDialog: boolean = false;

  submitted: boolean = false;

  tag: Tag = {};

  entities: any[] = [];

  birthSex: any[] = [];

  typeDialog: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private tagService: TagService
  ) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      entities: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.entities = this.tagService.entities;

  }

  setValuesForm() {
    this.form.patchValue({
      name: this.tag.name,
      entities: this.tag.typeEntityId?.name,
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

    this.tag.name = formValues.name;
    this.tag.typeEntityId = formValues.entity;

    if (this.typeDialog === 'new' ) {
      this.tagService.createTags( this.tag ).subscribe( (result: Tag) => {
        this.tagEmitter.emit( result );
      });
    }else{

    this.tagService.updateTag( this.tag ).subscribe( (result: Tag) => {
      this.tagEmitter.emit( result );
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
