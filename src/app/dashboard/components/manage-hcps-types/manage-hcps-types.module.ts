import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageHcpsTypesRoutingModule } from './manage-hcps-types-routing.module';
import { HcpsTypesComponent } from './hcps-types/hcps-types.component';
import { DialogHcpTypesComponent } from './hcps-types/dialogs/dialog-hcp-types/dialog-hcp-types.component';
import { RemoveHcpTypesComponent } from './hcps-types/dialogs/remove-hcp-types/remove-hcp-types.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { AlertsService } from '../../services/alerts.service';


@NgModule({
  declarations: [
    HcpsTypesComponent,
    DialogHcpTypesComponent,
    RemoveHcpTypesComponent
  ],
  imports: [
    CommonModule,
    ManageHcpsTypesRoutingModule,
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
  ],
  providers: [
  MessageService,
  AlertsService
  ]
})
export class ManageHcpsTypesModule { }
