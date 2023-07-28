import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageEntitiesRoutingModule } from './manage-entities-routing.module';
import { EntitiesComponent } from './entities/entities.component';
import { RemoveEntityComponent } from './entities/dialogs/remove-entity/remove-entity.component';
import { DialogEntityComponent } from './entities/dialogs/dialog-entity/dialog-entity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [
    EntitiesComponent,
    RemoveEntityComponent,
    DialogEntityComponent
  ],
  imports: [
    CommonModule,
    ManageEntitiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    ListboxModule,
    CardModule,
    CalendarModule,
    SelectButtonModule
  ]
})
export class ManageEntitiesModule { }
