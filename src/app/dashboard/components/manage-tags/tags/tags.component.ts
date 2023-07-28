import { Component, ViewChild, EventEmitter } from '@angular/core';
import { take } from 'rxjs';

import { Tag } from '../../../models/tag';
import { TranslateData } from "../../../interfaces/translate-data";

import { DialogTagComponent } from './dialogs/dialog-tag/dialog-tag.component';

import { TagService } from '../../../services/tag.service';
import { DeleteTagComponent } from "./dialogs/delete-tag/delete-tag.component";
import { TranslateService } from '../../../services/translate.service';

import { Table } from 'primeng/table';
import { AlertsService } from '../../../services/alerts.service';
import { MessageService } from 'primeng/api';
import { Service } from '../../../models/service';
import { EntityService } from '../../../services/entity.service';
import { Entity } from '../../../models/entity';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [AlertsService, MessageService]
})
export class TagsComponent {

  removeTagDialog: boolean = false;

  deleteTagsDialog: boolean = false;

  tags: Tag[] = [];

  tag: Tag = {}

  selectedTags: Tag[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [];

  entity: Entity[]= [];

  translatedStrings: TranslateData = {};

  @ViewChild( DialogTagComponent ) dialogTag!: DialogTagComponent;
  @ViewChild( DeleteTagComponent ) dialogRemoveTag!: DeleteTagComponent;

  constructor(
    private tagService: TagService,
    private TranslateService: TranslateService,
    private alertsService: AlertsService,
    private entityService:EntityService
  ) {}

  ngOnInit() {

    this.TranslateService.getTranslations().subscribe( ( translations: TranslateData ) => {
      this.translatedStrings = translations;
    });

    this.getEntity();

    this.reloadTable();
  }

  getEntity(){
    this.entityService.getEntities(1).subscribe( ( result: Entity[] ) => {
      this.entity = result;

    } )

  }

  reloadTable() {
    this.tagService.getTags().subscribe( ( result: Tag[] ) => {
      this.tags = result;
    });

  }

  dialogNewTag() {
    this.dialogTag.resetForm();
    this.dialogTag.typeDialog = 'new';
    this.dialogTag.tag = new Tag();
    this.dialogTag.submitted = false;
    this.dialogTag.tagDialog = true;

    if ( this.dialogTag.tagEmitter ) {
      this.dialogTag.tagEmitter.unsubscribe();
    }

    this.dialogTag.tagEmitter = new EventEmitter<Service>();

      this.dialogTag.tagEmitter.pipe( take(1) ).subscribe( (tag: Tag) => {
        tag ? ( this.alertsService.alertsTag.Insert(), this.reloadTable() ) : this.alertsService.alertsTag.Error();
    });
  }

  dialogEditTag( tag: Tag ) {
    this.dialogTag.typeDialog = 'edit';
    this.dialogTag.tag = { ...tag };
    this.dialogTag.tagDialog = true;
    this.dialogTag.setValuesForm();

    if ( this.dialogTag.tagEmitter ) {
      this.dialogTag.tagEmitter.unsubscribe();
    }

    this.dialogTag.tagEmitter = new EventEmitter<Service>();

    this.dialogTag.tagEmitter.pipe( take(1) ).subscribe( (tag: Tag) => {
      tag ? ( this.alertsService.alertsTag.Update(), this.reloadTable() ) : this.alertsService.alertsTag.Error();
    });
  }

  deleteSelectedTags() {
    this.deleteTagsDialog = true;
  }

  dialogDeleteTag( tag: Tag ) {
    this.dialogRemoveTag.removeTagDialog = true;
    this.dialogRemoveTag.tag = { ...tag };

    if ( this.dialogTag.tagEmitter ) {
      this.dialogTag.tagEmitter.unsubscribe();
    }

    this.dialogTag.tagEmitter = new EventEmitter<Service>();

    this.dialogRemoveTag.tagEmitter.pipe( take(1) ).subscribe( (result: any) => {
      if ( result.id ) {
        this.reloadTable();
      }
    });
  }

  findIndexById( id: number ): number {
    let index = -1;
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i].id === id) {
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
