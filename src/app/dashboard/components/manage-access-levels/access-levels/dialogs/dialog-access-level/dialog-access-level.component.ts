import { Component, EventEmitter, OnInit, Output, LOCALE_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DatePipe, registerLocaleData } from '@angular/common';
import { AccessLevel } from '../../../../../models/access-level';
import { AccessLevelService } from '../../../../../services/access-level.service';
import { TranslateService } from '../../../../../services/translate.service';
import { TranslateData } from '../../../../../interfaces/translate-data';
import { EntityService } from '../../../../../services/entity.service';
import { Entity } from '../../../../../models/entity';
import { UserService } from '../../../../../services/user.service';
import { User } from '../../../../../models/user';
import localeEsMX from '@angular/common/locales/es-MX';

import * as moment from 'moment';

registerLocaleData( localeEsMX );

@Component({
  selector: 'app-dialog-access-level',
  templateUrl: './dialog-access-level.component.html',
  styleUrls: ['./dialog-access-level.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
})

export class DialogAccessLevelComponent implements OnInit{

  datePipe: DatePipe = new DatePipe('es-MX');
  @Output() accessLevelEmitter: EventEmitter<AccessLevel> = new EventEmitter<AccessLevel>();

  translatedStrings: TranslateData= {};

  form: FormGroup;

  accessLevelDialog: boolean = false;

  submitted: boolean = false;

  accessLevel: AccessLevel = {};

  entity: Entity[] = [];

  user: User[] = [];

  entities: any[] = [];

  users: any[] = [];

  permission: any[] = [];

  typeDialog: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private accessLevelService: AccessLevelService,
    private TranslateService: TranslateService,
    private entityService : EntityService,
    private userService : UserService,

  ) {

    this.form = this.formBuilder.group({
      users: ['', Validators.required],
      permission: ['', Validators.required],
      entities: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.permission = this.accessLevelService.permission;
    this.TranslateService.getTranslations().subscribe( ( translations: TranslateData ) => {
      this.translatedStrings = translations;
    });

    this.getEntity();
    this.getUser();
  }

  getEntity(){
    this.entityService.getEntities().subscribe( ( result: Entity[] ) => {
      this.entity = result;
    } )
  }

  getUser(){
    this.userService.getUsers(1).subscribe( ( result: User[] ) => {
      this.user = result;
    } )
  }

  setValuesForm() {
    console.log(this.accessLevel);
    this.form.patchValue({
      permission: this.accessLevel.permission,
      entities: this.accessLevel.typeEntity.id,
      users: this.accessLevel.user.id,
    });
  }

  save() {

    this.submitted = false;

    if ( this.form.invalid ) {
      this.submitted = true;
      return;
    }

    const formValues = this.form.getRawValue();
    this.accessLevel.permission = formValues.permission;
    let a = parseInt(formValues.entities, 10);
    this.accessLevel.typeEntity = a;
    let b = parseInt(formValues.users, 10);
    this.accessLevel.user = b;
    console.log(this.accessLevel);
    if (this.typeDialog === 'new' ) {

      this.accessLevelService.createAccessLevel( this.accessLevel ).subscribe( (result: AccessLevel) => {
        this.accessLevelEmitter.next( result );
      });
    }else{

    this.accessLevelService.updateAccessLevel( this.accessLevel ).subscribe( (result: AccessLevel) => {
      this.accessLevelEmitter.next( result );
    });
  }

    this.hideDialog();

  }

  hideDialog() {
    this.form.reset();
    this.accessLevelDialog = false;
    this.submitted = false;
  }
}
