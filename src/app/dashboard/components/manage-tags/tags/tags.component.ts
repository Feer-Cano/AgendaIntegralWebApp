import { Component, ViewChild } from '@angular/core';
import { Tag } from '../../../models/tag';
import { NewTagComponent } from './dialogs/new-tag/new-tag.component';
import { TagService } from '../../../services/tag.service';
import { Table } from 'primeng/table';
import { TranslateService } from '../../../services/translate.service';

type TranslateData = {
  [key: string]: string;
};

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  deleteTagDialog: boolean = false;

  deleteTagsDialog: boolean = false;

  tags: Tag[] = [];

  tag: Tag = {}

  selectedTags: Tag[] = [];

  statuses: any[] = [];


  rowsPerPageOptions = [5, 10, 20];

  cols: any[] = [];
  translatedStrings: TranslateData = {};
  @ViewChild( NewTagComponent ) dialogTag!: NewTagComponent;

  constructor(
    private tagService: TagService,
    private TranslateService: TranslateService
  ) {}

  ngOnInit() {
    this.TranslateService.getTranslations().subscribe((translations: TranslateData) => {
      this.translatedStrings = translations;
    });


    this.tagService.getTags().subscribe( (result: Tag[]) => {
      this.tags = result;
    });

  }

  openNew() {

    this.dialogTag.tag = {};
    this.dialogTag.submitted = false;
    this.dialogTag.tagDialog = true;

    this.dialogTag.tagCreated.subscribe( (newTag: Tag) => {
      if ( newTag ) {
        this.tagService.getTags().subscribe( (result: Tag[]) => {
          this.tags = result;
        });
      }
    });
  }

  deleteSelectedTags() {
    this.deleteTagsDialog = true;
  }

  editTag(tag: Tag) {
    this.dialogTag.tag = { ...tag };
    this.dialogTag.tagDialog = true;
  }

  deleteTag(tag: Tag) {
    this.deleteTagDialog = true;
    this.dialogTag.tag = { ...tag };
  }

  confirmDeleteSelected() {
    this.deleteTagsDialog = false;
    this.tags = this.tags.filter(val => !this.selectedTags.includes(val));
    this.selectedTags = [];
  }

  confirmDelete() {
    this.deleteTagDialog = false;
    this.tags = this.tags.filter(val => val.id !== this.dialogTag.tag.id);
    this.dialogTag.tag = {};
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
