import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAccessLevelsRoutingModule } from './manage-access-levels-routing.module';
import { AccessLevelsComponent } from './access-levels/access-levels.component';
import { DialogAccessLevelComponent } from './access-levels/dialogs/dialog-access-level/dialog-access-level.component';
import { DeleteAccessLevelComponent } from './access-levels/dialogs/delete-access-level/delete-access-level.component';
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
    AccessLevelsComponent,
    DialogAccessLevelComponent,
    DeleteAccessLevelComponent
  ],
  imports: [
    CommonModule,
    ManageAccessLevelsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
  ]
})
export class ManageAccessLevelsModule { }
