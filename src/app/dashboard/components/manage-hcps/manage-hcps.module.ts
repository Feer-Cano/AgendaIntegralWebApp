import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageHcpsRoutingModule } from './manage-hcps-routing.module';
import { HcpsComponent } from './hcps/hcps.component';
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
import { RemoveHcpComponent } from './hcps/dialogs/remove-hcp/remove-hcp.component';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { AlertsService } from '../../services/alerts.service';
import { DialogHcpComponent } from './hcps/dialogs/dialog-hcp/dialog-hcp.component';


@NgModule({
  declarations: [
    HcpsComponent,
    DialogHcpComponent,
    RemoveHcpComponent
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
  ],
  providers: [
  MessageService,
  AlertsService
  ]
})
export class ManageHcpsModule {
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
