import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageHcpsRoutingModule } from './manage-hcps-routing.module';
import { HcpsComponent } from './hcps/hcps.component';
import { NewHcpComponent } from './hcps/dialogs/new-hcp/new-hcp.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
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


@NgModule({
  declarations: [
    HcpsComponent,
    NewHcpComponent
  ],
  imports: [
    CommonModule,
    ManageHcpsRoutingModule,
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
export class ManageHcpsModule { }
