import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ManageServicesRoutingModule } from './manage-services-routing.module';
import { ServicesComponent } from './services/services.component';
import { DialogServiceComponent } from './services/dialogs/dialog-service/dialog-service.component';
import { DeleteServiceComponent } from './services/dialogs/delete-service/delete-service.component';

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
import { CalendarModule } from "primeng/calendar";
import { SelectButtonModule } from 'primeng/selectbutton';
import { PrimeNGConfig } from 'primeng/api';



@NgModule({
  declarations: [
    ServicesComponent,
    DialogServiceComponent,
    DeleteServiceComponent
  ],
  imports: [
    CommonModule,
    ManageServicesRoutingModule,
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
export class ManageServicesModule { }
