import { Component, ViewChild, EventEmitter } from '@angular/core';
import { TranslateService } from '../../../services/translate.service';
import { DialogHcpComponent } from "./dialogs/dialog-hcp/dialog-hcp.component";
import { Table } from 'primeng/table';
import { Hcp } from '../../../models/hcp';
import { HcpService } from '../../../services/hcp.service';
import { TranslateData } from "../../../interfaces/translate-data";
import { AlertsService } from '../../../services/alerts.service';
import { take } from 'rxjs';
import { RemoveHcpComponent } from "./dialogs/remove-hcp/remove-hcp.component";

@Component({
  selector: 'app-hcps',
  templateUrl: './hcps.component.html',
  styleUrls: ['./hcps.component.scss'],
  providers: [AlertsService]

})

export class HcpsComponent {

  removeHcpDialog: boolean = false;

  deleteHcpsDialog: boolean = false;

  hcps: Hcp[] = [];

  hcp: Hcp = {}

  selectedHcps: Hcp[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [];

  translatedStrings: TranslateData = {};

  birthSex: any[] = [];


  @ViewChild( DialogHcpComponent ) dialogHcp!: DialogHcpComponent;
  @ViewChild( RemoveHcpComponent ) dialogRemoveHcp!: RemoveHcpComponent;

  constructor(
    private hcpService: HcpService,
    private translateService: TranslateService,
    private alertsService: AlertsService
  ) {}

  ngOnInit() {

    this.birthSex = this.hcpService.birthSex;

    this.translateService.getTranslations().subscribe( ( translations: TranslateData ) => {
      this.translatedStrings = translations;
    });

    this.reloadTable();

  }

  reloadTable() {
    this.hcpService.getHCPS(1).subscribe( ( result: Hcp[] ) => {
      this.hcps = result;
    });
  }

  dialogNewHcp() {

    this.dialogHcp.hideDialog();
    this.dialogHcp.typeDialog = 'new';
    this.dialogHcp.hcp = new Hcp({ isActive: 1 });
    this.dialogHcp.submitted = false;
    this.dialogHcp.hcpDialog = true;

    if ( this.dialogHcp.hcpEmitter ) {
      this.dialogHcp.hcpEmitter.unsubscribe();
    }

    this.dialogHcp.hcpEmitter = new EventEmitter<Hcp>();

    this.dialogHcp.hcpEmitter.pipe( take(1) ).subscribe( (hcp: Hcp) => {
      hcp ? ( this.alertsService.alertsHcp.Insert(), this.reloadTable() ) : this.alertsService.alertsHcp.Error();
    });

  }



  dialogEditHcp(hcp: Hcp) {

    this.dialogHcp.typeDialog = 'edit';
    this.dialogHcp.hcp = { ...hcp };
    this.dialogHcp.hcpDialog = true;
    this.dialogHcp.setValuesForm();

    if ( this.dialogHcp.hcpEmitter ) {
      this.dialogHcp.hcpEmitter.unsubscribe();
    }

    this.dialogHcp.hcpEmitter = new EventEmitter<Hcp>();

    this.dialogHcp.hcpEmitter.pipe( take(1) ).subscribe( (hcp: Hcp) => {
      hcp ? ( this.alertsService.alertsHcp.Update(), this.reloadTable() ) : this.alertsService.alertsHcp.Error();
      ;
    });

  }

  deleteSelectedHcps() {

    this.deleteHcpsDialog = true;

  }

  dialogDeleteHcp( hcp: Hcp ) {

    this.dialogRemoveHcp.removeHcpDialog = true;
    this.dialogRemoveHcp.hcp = { ...hcp };

    if ( this.dialogHcp.hcpEmitter ) {
      this.dialogHcp.hcpEmitter.unsubscribe();
    }

    this.dialogHcp.hcpEmitter = new EventEmitter<Hcp>();

    this.dialogRemoveHcp.hcpEmitter.pipe( take(1) ).subscribe( (result: any) => {
      if ( result.id ) {
        this.reloadTable();
      }
    });

  }

  findIndexById( id: number ): number {

    let index = -1;
    for ( let i = 0; i < this.hcps.length; i++ ) {
      if ( this.hcps[i].id === id ) {
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
