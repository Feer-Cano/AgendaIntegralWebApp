import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateData } from 'src/app/dashboard/interfaces/translate-data';

import { Tag } from 'src/app/dashboard/models/tag';

import { TranslateService } from 'src/app/dashboard/services/translate.service';
import { TagService } from "../../../../../services/tag.service";
import { AlertsService } from '../../../../../services/alerts.service';

@Component({
  selector: 'app-remove-tag',
  templateUrl: './remove-tag.component.html',
  styleUrls: ['./remove-tag.component.scss'],
  providers: [AlertsService]

})

export class RemoveTagComponent {

  @Output() tagEmitter: EventEmitter<Tag> = new EventEmitter<Tag>();

  translatedStrings: TranslateData = {};

  tag: Tag = {};

  submitted: boolean = false;

  removeTagsDialog: boolean = false;

  removeTagDialog: boolean = false;

  confirmationText: string = '';

  constructor(
    public tagService: TagService,
    private translateService: TranslateService,
    private alertsService: AlertsService
  ){}

  ngOnInit() {

    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translatedStrings = translations;
    });
  }

  confirmDelete() {

    if ( this.confirmationText === 'eliminar' && this.tag.id ) {
      this.tagService.removeTag( this.tag.id ).subscribe({
        next: (result) => {

          this.alertsService.alertsTag.Warning();
          this.tagEmitter.next( result );
        },
        error: () => {
          this.alertsService.alertsTag.Error();
        }
      })
    } else {
      this.alertsService.alertsTag.Error();
    }

    this.onClose();
  }

  onClose() {
    this.removeTagDialog = false;
    this.confirmationText = '';
  }

  // confirmDeleteSelected() {
  //   this.removeTagsDialog = false;
  //   this.tags = this.tags.filter(val => !this.selectedTags.includes( val ));
  //   this.selectedTags = [];
  // }


}

