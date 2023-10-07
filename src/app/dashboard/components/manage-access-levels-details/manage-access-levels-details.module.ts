import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAccessLevelsDetailsRoutingModule } from './manage-access-levels-details-routing.module';
import { AccessLevelsDetailsComponent } from './access-levels-details/access-levels-details.component';
import { DialogAccessLevelDetailsComponent } from './access-levels-details/dialogs/dialog-access-level-details/dialog-access-level-details.component';
import { RemoveAccessLevelDetailsComponent } from './access-levels-details/dialogs/remove-access-level-details/remove-access-level-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    AccessLevelsDetailsComponent,
    DialogAccessLevelDetailsComponent,
    RemoveAccessLevelDetailsComponent
  ],
  imports: [
    CommonModule,
    ManageAccessLevelsDetailsRoutingModule,
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
export class ManageAccessLevelsDetailsModule { }





