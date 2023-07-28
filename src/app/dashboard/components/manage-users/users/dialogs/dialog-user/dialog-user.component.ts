
import { LOCALE_ID, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User } from "../../../../../models/user";
import { UserService } from "../../../../../services/user.service";
import * as moment from 'moment';
import localeEsMX from '@angular/common/locales/es-MX';
import { TranslateService } from '../../../../../services/translate.service';
import { TranslateData } from '../../../../../interfaces/translate-data';
registerLocaleData( localeEsMX );

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
})
export class DialogUserComponent implements OnInit{

  @Output() userEmitter: EventEmitter<User> = new EventEmitter<User>();

  datePipe: DatePipe = new DatePipe('es-MX');

  form: FormGroup;

  userDialog: boolean = false;

  submitted: boolean = false;

  user: User = {};

  maritalStatus: any[] = [];

  birthSex: any[] = [];

  typeDialog: string = '';

  translatedStrings: TranslateData = {};

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private translateService: TranslateService
  ) {

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthSex: ['', [Validators.required]],
      birthDate: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.birthSex = this.userService.birthSex;
    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translatedStrings = translations;
    });
  }

  setValuesForm() {
    this.form.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      birthSex: this.user.birthSex,
      birthDate: this.datePipe.transform( this.user.birthDate, 'dd/MM/yyyy' ),
      mobilePhone: this.user.mobilePhone,
      email: this.user.email,
      password: this.user.password,
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

    this.user.firstName = formValues.firstName;
    this.user.lastName = formValues.lastName;
    this.user.birthSex = formValues.birthSex;
    this.user.birthDate = formValues.birthDate;
    this.user.mobilePhone = formValues.mobilePhone;
    this.user.email = formValues.email;
    this.user.password = formValues.password;

    if ( this.typeDialog === 'new' ) {

      this.userService.createUser( this.user ).subscribe( (result: User) => {
        this.userEmitter.next( result );
      });

    } else {

      this.user.birthDate = moment( this.user.birthDate, 'DD/MM/YYYY' ).toDate();

      this.userService.updateUser( this.user ).subscribe( (result: User) => {
        this.userEmitter.next( result );
      });
    }

    this.hideDialog();
  }

  hideDialog() {
    this.form.reset();
    this.userDialog = false;
    this.submitted = false;
  }

}
