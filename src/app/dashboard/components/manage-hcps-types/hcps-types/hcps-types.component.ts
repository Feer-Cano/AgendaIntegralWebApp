import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '../../../services/translate.service';
import { Table } from 'primeng/table';
import { TranslateData } from "../../../interfaces/translate-data";
import { AlertsService } from '../../../services/alerts.service';
import { take } from 'rxjs';
import { HcpTypes } from '../../../models/hcp-types';
import { DialogHcpTypesComponent } from './dialogs/dialog-hcp-types/dialog-hcp-types.component';
import { RemoveHcpTypesComponent } from './dialogs/remove-hcp-types/remove-hcp-types.component';
import { HcpTypesService } from '../../../services/hcp-types.service';

@Component({
  selector: 'app-hcps-types',
  templateUrl: './hcps-types.component.html',
  styleUrls: ['./hcps-types.component.scss'],
  providers: [AlertsService]
})
export class HcpsTypesComponent {

  removeHcpTypesDialog: boolean = false;

  deleteHcpsTypesDialog: boolean = false;

  hcpsTypes: HcpTypes[] = [];

  hcpTypes: HcpTypes = {}

  selectedHcpsTypes: HcpTypes[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [];

  translatedStrings: TranslateData = {};

  birthSex: any[] = [];


  @ViewChild( DialogHcpTypesComponent ) dialogHcpTypes!: DialogHcpTypesComponent;
  @ViewChild( RemoveHcpTypesComponent ) dialogRemoveHcpTypes!: RemoveHcpTypesComponent;

  constructor(
    private hcpTypesService: HcpTypesService,
    private translateService: TranslateService,
    private alertsService: AlertsService
  ) {}

  ngOnInit() {
    this.translateService.getTranslations().subscribe( ( translations: TranslateData ) => {
      this.translatedStrings = translations;
    });

    this.reloadTable();

  }

  reloadTable() {
    this.hcpTypesService.getHcpTypes(1).subscribe( ( result: HcpTypes[] ) => {
      this.hcpsTypes = result;
    });
  }

  dialogNewHcpTypes() {

    this.dialogHcpTypes.resetForm();
    this.dialogHcpTypes.typeDialog = 'new';
    this.dialogHcpTypes.hcpTypes = new HcpTypes({ isActive: 1 });
    this.dialogHcpTypes.submitted = false;
    this.dialogHcpTypes.hcpTypesDialog = true;

    this.dialogHcpTypes.hcpTypesEmitter.pipe( take(1) ).subscribe( (hcpTypes: HcpTypes) => {
      hcpTypes ? ( this.alertsService.alertsHcpTypes.Error() ) : this.alertsService.alertsHcpTypes.Insert(), this.reloadTable();
    });

  }



  dialogEditHcpTypes(hcpTypes: HcpTypes) {

    this.dialogHcpTypes.typeDialog = 'edit';
    this.dialogHcpTypes.hcpTypes = { ...hcpTypes };
    this.dialogHcpTypes.hcpTypesDialog = true;
    this.dialogHcpTypes.setValuesForm();

    this.dialogHcpTypes.hcpTypesEmitter.pipe( take(1) ).subscribe( (hcpTypes: HcpTypes) => {
      hcpTypes ? ( this.alertsService.alertsHcpTypes.Update(), this.reloadTable() ) : this.alertsService.alertsHcpTypes.Error();
      ;
    });

  }

  deleteSelectedHcpsTypes() {

    this.deleteHcpsTypesDialog = true;

  }

  dialogDeleteHcpTypes( hcpTypes: HcpTypes ) {

    this.dialogRemoveHcpTypes.removeHcpTypesDialog = true;
    this.dialogRemoveHcpTypes.hcpTypes = { ...hcpTypes };

    this.dialogRemoveHcpTypes.hcpTypesEmitter.pipe( take(1) ).subscribe( (result: any) => {
      if ( result.id ) {
        this.reloadTable();
      }
    });

  }

  findIndexById( id: number ): number {

    let index = -1;
    for ( let i = 0; i < this.hcpsTypes.length; i++ ) {
      if ( this.hcpsTypes[i].id === id ) {
        index = i;
        break;
      }
    }
    return index;

  }

  onGlobalFilter( table: Table, event: Event ) {

    table.filterGlobal(( event.target as HTMLInputElement ).value, 'contains');

  }

}
