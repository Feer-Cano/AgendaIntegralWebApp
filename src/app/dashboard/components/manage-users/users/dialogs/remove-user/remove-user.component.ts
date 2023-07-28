import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateData } from 'src/app/dashboard/interfaces/translate-data';
import { User } from 'src/app/dashboard/models/user';
import { TranslateService } from 'src/app/dashboard/services/translate.service';
import { UserService } from "../../../../../services/user.service";
import { AlertsService } from '../../../../../services/alerts.service';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.scss'],
  providers: [MessageService, AlertsService]
})
export class RemoveUserComponent {

  @Output() userEmitter: EventEmitter<User> = new EventEmitter<User>();

  translatedStrings: TranslateData = {};

  user: User = {};

  submitted: boolean = false;

  removeUsersDialog: boolean = false;

  removeUserDialog: boolean = false;

  confirmationText: string = '';

  constructor(
    public userService: UserService,
    private alertsService: AlertsService,
    private translateService: TranslateService,
  ){}

  ngOnInit() {

    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translatedStrings = translations;
    });
  }

  confirmDelete() {

    if ( this.confirmationText === 'eliminar' && this.user.id ) {
      this.userService.removeUser( this.user.id ).subscribe({
        next: (result) => {
          this.alertsService.alertsUser.Warning();
          this.userEmitter.next( result );
        },
        error: () => {
          this.alertsService.alertsUser.Error();
        }
      })
    } else {
      this.alertsService.alertsUser.Error();
    }

    this.onClose();
  }

  onClose() {
    this.removeUserDialog = false;
    this.confirmationText = '';
  }


}

