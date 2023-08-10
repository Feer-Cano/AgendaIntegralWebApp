import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateData } from 'src/app/dashboard/interfaces/translate-data';
import { AccessLevel } from 'src/app/dashboard/models/access-level';
import { TranslateService } from 'src/app/dashboard/services/translate.service';
import { AccessLevelService } from "../../../../../services/access-level.service";
import { AlertsService } from '../../../../../services/alerts.service';

@Component({
  selector: 'app-delete-access-level',
  templateUrl: './delete-access-level.component.html',
  styleUrls: ['./delete-access-level.component.scss'],
  providers: [AlertsService]
})
export class DeleteAccessLevelComponent {


  @Output() accessLevelEmitter: EventEmitter<AccessLevel> = new EventEmitter<AccessLevel>();

  translatedStrings: TranslateData = {};

  accessLevel: AccessLevel = {};

  submitted: boolean = false;

  removeAccessLevelsDialog: boolean = false;

  removeAccessLevelDialog: boolean = false;

  confirmationText: string = '';

  constructor(
    public accessLevelService: AccessLevelService,
    private translateService: TranslateService,
    private alertsService: AlertsService
  ){}

  ngOnInit() {

    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translatedStrings = translations;
    });
  }

  confirmDelete() {

    if ( this.confirmationText === 'eliminar' && this.accessLevel.id ) {
      this.accessLevelService.deleteAccessLevel( this.accessLevel.id ).subscribe({
        next: (result) => {

          this.alertsService.alertsAccessLevel.Warning();
          this.accessLevelEmitter.next( result );
        },
        error: () => {
          this.alertsService.alertsAccessLevel.Error();
        }
      })
    } else {
      this.alertsService.alertsAccessLevel.Error();
    }

    this.onClose();
  }

  onClose() {
    this.removeAccessLevelDialog = false;
    this.confirmationText = '';
  }

}

