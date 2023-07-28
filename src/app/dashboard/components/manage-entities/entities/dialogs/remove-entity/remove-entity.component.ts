import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateData } from 'src/app/dashboard/interfaces/translate-data';
import { TranslateService } from 'src/app/dashboard/services/translate.service';
import { EntityService } from "../../../../../services/entity.service";
import { AlertsService } from '../../../../../services/alerts.service';
import { Entity } from '../../../../../models/entity';

@Component({
  selector: 'app-remove-entity',
  templateUrl: './remove-entity.component.html',
  styleUrls: ['./remove-entity.component.scss'],
  providers: [AlertsService]
})
export class RemoveEntityComponent {

  @Output() entityEmitter: EventEmitter<Entity> = new EventEmitter<Entity>();

  translatedStrings: TranslateData = {};

  entity: Entity = {};

  submitted: boolean = false;

  removeEntitysDialog: boolean = false;

  removeEntityDialog: boolean = false;

  confirmationText: string = '';

  constructor(
    public entityService: EntityService,
    private translateService: TranslateService,
    private alertsService: AlertsService
  ){}

  ngOnInit() {

    this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
      this.translatedStrings = translations;
    });
  }

  confirmRemove() {

    if ( this.confirmationText === 'eliminar' && this.entity.id ) {
      this.entityService.removeEntity( this.entity.id ).subscribe({
        next: (result) => {

          this.alertsService.alertsEntities.Warning();
          this.entityEmitter.next( result );
        },
        error: () => {
          this.alertsService.alertsEntities.Error();
        }
      })
    } else {
      this.alertsService.alertsEntities.Error();
    }

    this.onClose();
  }

  onClose() {
    this.removeEntityDialog = false;
    this.confirmationText = '';
  }

  // confirmDeleteSelected() {
  //   this.removeTagsDialog = false;
  //   this.tags = this.tags.filter(val => !this.selectedTags.includes( val ));
  //   this.selectedTags = [];
  // }


}

