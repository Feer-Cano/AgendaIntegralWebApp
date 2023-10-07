import { Component, ViewChild, EventEmitter } from '@angular/core';
import { take } from 'rxjs';
import { AccessLevel } from '../../../models/access-level';
import { TranslateData } from "../../../interfaces/translate-data";
import { DialogAccessLevelComponent } from './dialogs/dialog-access-level/dialog-access-level.component';
import { AccessLevelService } from '../../../services/access-level.service';
import { DeleteAccessLevelComponent } from "./dialogs/delete-access-level/delete-access-level.component";
import { TranslateService } from '../../../services/translate.service';
import { Table } from 'primeng/table';
import { AlertsService } from '../../../services/alerts.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-access-levels',
  templateUrl: './access-levels.component.html',
  styleUrls: ['./access-levels.component.scss'],
  providers: [AlertsService, MessageService]

})
export class AccessLevelsComponent {


  deleteAccessLevelsDialog: boolean = false;

  accessLevels: AccessLevel[] = [];

  selectedAccessLevels: AccessLevel[] = [];

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [];

  translatedStrings: TranslateData = {};

  @ViewChild( DialogAccessLevelComponent ) dialogAccessLevel!: DialogAccessLevelComponent;
  @ViewChild( DeleteAccessLevelComponent ) dialogRemoveAccessLevel!: DeleteAccessLevelComponent;

  constructor(
    private accessLevelService: AccessLevelService,
    private TranslateService: TranslateService,
    private alertsService: AlertsService,
  ) {}

  ngOnInit() {

    this.TranslateService.getTranslations().subscribe( ( translations: TranslateData ) => {
      this.translatedStrings = translations;
    });
    this.reloadTable();
  }

  reloadTable() {
    this.accessLevelService.getAccessLevels().subscribe( ( result: AccessLevel[] ) => {
      this.accessLevels = result;
    });

  }

  dialogNewAccessLevel() {
    this.dialogAccessLevel.hideDialog();
    this.dialogAccessLevel.typeDialog = 'new';
    this.dialogAccessLevel.accessLevel = new AccessLevel();
    this.dialogAccessLevel.submitted = false;
    this.dialogAccessLevel.accessLevelDialog = true;

    if ( this.dialogAccessLevel.accessLevelEmitter ) {
      this.dialogAccessLevel.accessLevelEmitter.unsubscribe();
    }

    this.dialogAccessLevel.accessLevelEmitter = new EventEmitter<AccessLevel>();

      this.dialogAccessLevel.accessLevelEmitter.pipe( take(1) ).subscribe( (accessLevel: AccessLevel) => {
        accessLevel ? ( this.alertsService.alertsAccessLevel.Insert(), this.reloadTable() ) : this.alertsService.alertsAccessLevel.Error();
    });
  }

  dialogEditAccessLevel( accessLevel: AccessLevel ) {
    this.dialogAccessLevel.typeDialog = 'edit';
    this.dialogAccessLevel.accessLevel = { ...accessLevel };
    this.dialogAccessLevel.accessLevelDialog = true;
    this.dialogAccessLevel.setValuesForm();

    if ( this.dialogAccessLevel.accessLevelEmitter ) {
      this.dialogAccessLevel.accessLevelEmitter.unsubscribe();
    }

    this.dialogAccessLevel.accessLevelEmitter = new EventEmitter<AccessLevel>();

    this.dialogAccessLevel.accessLevelEmitter.pipe( take(1) ).subscribe( (accessLevel: AccessLevel) => {
      accessLevel ? ( this.alertsService.alertsAccessLevel.Update(), this.reloadTable() ) : this.alertsService.alertsAccessLevel.Error();
    });
  }

  deleteSelectedAccessLevels() {
    this.deleteAccessLevelsDialog = true;
  }

  dialogDeleteAccessLevel( accessLevel: AccessLevel ) {
    this.dialogRemoveAccessLevel.removeAccessLevelDialog = true;
    this.dialogRemoveAccessLevel.accessLevel = { ...accessLevel };

    if ( this.dialogAccessLevel.accessLevelEmitter ) {
      this.dialogAccessLevel.accessLevelEmitter.unsubscribe();
    }

    this.dialogAccessLevel.accessLevelEmitter = new EventEmitter<AccessLevel>();

    this.dialogRemoveAccessLevel.accessLevelEmitter.pipe( take(1) ).subscribe( (result: any) => {
      if ( result.id ) {
        this.reloadTable();
      }
    });
  }

  findIndexById( id: number ): number {
    let index = -1;
    for (let i = 0; i < this.accessLevels.length; i++) {
      if (this.accessLevels[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter( table: Table, event: Event ) {
    table.filterGlobal( ( event.target as HTMLInputElement ).value, 'contains' );
  }

}
