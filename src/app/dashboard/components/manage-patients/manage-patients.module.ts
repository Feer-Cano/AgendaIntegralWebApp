import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ManagePatientsRoutingModule } from './manage-patients-routing.module';
import { PatientsComponent } from './patients/patients.component';
import { NewPatientComponent } from './patients/dialogs/new-patient/new-patient.component';

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
    PatientsComponent,
    NewPatientComponent
  ],
  imports: [
    CommonModule,
    ManagePatientsRoutingModule,
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
export class ManagePatientsModule { 
  constructor(private primengConfig: PrimeNGConfig) {
    // Establece el idioma por defecto en español
    this.primengConfig.setTranslation({
      firstDayOfWeek: 1,
      dayNames: [
        'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
      ],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ],
      monthNamesShort: [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
      ],
      today: 'Hoy',
      clear: 'Limpiar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sem'
    });
  }
 }
