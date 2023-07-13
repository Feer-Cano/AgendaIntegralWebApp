import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '../../../services/translate.service';
import { NewHcpComponent } from "./dialogs/new-hcp/new-hcp.component";
import { Table } from 'primeng/table';
import { Hcp } from '../../../models/hcp';
import { HcpService } from '../../../services/hcp.service';
import { TranslateData } from "../../../interfaces/translate-data";

@Component({
  selector: 'app-hcps',
  templateUrl: './hcps.component.html',
  styleUrls: ['./hcps.component.scss']
})

export class HcpsComponent {

  deleteHcpDialog: boolean = false;

  deleteHcpsDialog: boolean = false;

  hcps: Hcp[] = [];

  hcp: Hcp = {}

  selectedHcps: Hcp[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [];

  translatedStrings: TranslateData = {};

  @ViewChild( NewHcpComponent ) dialogHcp!: NewHcpComponent;

  constructor(
    private hcpService: HcpService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {

    this.translateService.getTranslations().subscribe( ( translations: TranslateData ) => {
      this.translatedStrings = translations;
    });

    this.hcpService.getHCPS().subscribe( ( result: Hcp[] ) => {
      this.hcps = result;
    });

  }

  openNew() {

    this.dialogHcp.typeDialog = 'new';
    this.dialogHcp.hcp = new Hcp({ isActive: 1 });
    this.dialogHcp.submitted = false;
    this.dialogHcp.hcpDialog = true;

    this.dialogHcp.hcpEmitter.subscribe( ( Hcp: Hcp ) => {
      if ( Hcp ) {
        this.hcpService.getHCPS().subscribe( ( result: Hcp[] ) => {
          this.hcps = result;
        });
      }
    });

  }

  deleteSelectedHcps() {

    this.deleteHcpsDialog = true;

  }

  editHcp(hcp: Hcp) {

    this.dialogHcp.hcp = { ...hcp };
    this.dialogHcp.hcpDialog = true;
    this.dialogHcp.typeDialog = 'edit';
    this.dialogHcp.setValuesForm();

    this.dialogHcp.hcpEmitter.subscribe( ( hcp: Hcp ) => {
      if ( hcp ) {
        this.hcpService.getHCPS().subscribe( ( result: Hcp[] ) => {
          this.hcps = result;
        });
      }
    });

  }

  deleteHcp( hcp: Hcp ) {

    this.deleteHcpDialog = true;
    this.dialogHcp.hcp = { ...hcp };

  }

  confirmDeleteSelected() {

    this.deleteHcpsDialog = false;
    this.hcps = this.hcps.filter( val => !this.selectedHcps.includes( val ) );
    this.selectedHcps = [];

  }

  confirmDelete() {

    this.deleteHcpDialog = false;
    this.hcps = this.hcps.filter( val => val.id !== this.dialogHcp.hcp.id );
    this.dialogHcp.hcp = {};

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
