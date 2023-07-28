import { take } from 'rxjs';
import { Entity } from '../../../models/entity';
import { TranslateData } from "../../../interfaces/translate-data";
import { DialogEntityComponent } from './dialogs/dialog-entity/dialog-entity.component';
import { RemoveEntityComponent } from "./dialogs/remove-entity/remove-entity.component";
import { TranslateService } from '../../../services/translate.service';
import { Table } from 'primeng/table';
import { AlertsService } from '../../../services/alerts.service';
import { Service } from '../../../models/service';
import { EntityService } from '../../../services/entity.service';
import { Component, ViewChild, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
  providers: [AlertsService, MessageService]
})
export class EntitiesComponent {

  removeEntityDialog: boolean = false;

  deleteEntitiesDialog: boolean = false;

  entities: Entity[] = [];

  entity: Entity = {}

  selectedEntities: Entity[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [];

  translatedStrings: TranslateData = {};

  @ViewChild( DialogEntityComponent ) dialogEntity!: DialogEntityComponent;
  @ViewChild( RemoveEntityComponent ) dialogRemoveEntity!: RemoveEntityComponent;

  constructor(
    private TranslateService: TranslateService,
    private alertsService: AlertsService,
    private entityService:EntityService
  ) {}

  ngOnInit() {

    this.TranslateService.getTranslations().subscribe( ( translations: TranslateData ) => {
      this.translatedStrings = translations;
    });


    this.reloadTable();
  }


  reloadTable() {
    this.entityService.getEntities().subscribe( ( result: Entity[] ) => {
      this.entities = result;
    });

  }

  dialogNewEntity() {
    this.dialogEntity.hideDialog();
    this.dialogEntity.typeDialog = 'new';
    this.dialogEntity.entity = new Entity();
    this.dialogEntity.submitted = false;
    this.dialogEntity.entityDialog = true;

    if ( this.dialogEntity.entityEmitter ) {
      this.dialogEntity.entityEmitter.unsubscribe();
    }

    this.dialogEntity.entityEmitter = new EventEmitter<Entity>();

      this.dialogEntity.entityEmitter.pipe( take(1) ).subscribe( (entity: Entity) => {
        entity ? ( this.alertsService.alertsEntities.Insert(), this.reloadTable() ) : this.alertsService.alertsEntities.Error();
    });
  }

  dialogEditEntity( entity: Entity ) {
    this.dialogEntity.typeDialog = 'edit';
    this.dialogEntity.entity = { ...entity };
    this.dialogEntity.entityDialog = true;
    this.dialogEntity.setValuesForm();

    if ( this.dialogEntity.entityEmitter ) {
      this.dialogEntity.entityEmitter.unsubscribe();
    }

    this.dialogEntity.entityEmitter = new EventEmitter<Service>();

    this.dialogEntity.entityEmitter.pipe( take(1) ).subscribe( (entity: Entity) => {
      entity ? ( this.alertsService.alertsEntities.Update(), this.reloadTable() ) : this.alertsService.alertsEntities.Error();
    });
  }

  deleteSelectedEntities() {
    this.deleteEntitiesDialog = true;
  }

  dialogDeleteEntity( entity: Entity ) {
    this.dialogRemoveEntity.removeEntityDialog = true;
    this.dialogRemoveEntity.entity = { ...entity };

    if ( this.dialogEntity.entityEmitter ) {
      this.dialogEntity.entityEmitter.unsubscribe();
    }

    this.dialogEntity.entityEmitter = new EventEmitter<Service>();

    this.dialogRemoveEntity.entityEmitter.pipe( take(1) ).subscribe( (result: any) => {
      if ( result.id ) {
        this.reloadTable();
      }
    });
  }

  findIndexById( id: number ): number {
    let index = -1;
    for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i].id === id) {
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
