import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { CalendarModule } from "primeng/calendar";
import { SelectButtonModule } from 'primeng/selectbutton';
import { ManageTagsRoutingModule } from './manage-tags-routing.module';
import { TagsComponent } from './tags/tags.component';
import { DialogTagComponent } from './tags/dialogs/dialog-tag/dialog-tag.component';
import { DeleteTagComponent } from './tags/dialogs/delete-tag/delete-tag.component';


@NgModule({
  imports: [
    CommonModule,
    ManageTagsRoutingModule,
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
  declarations: [
    TagsComponent,
    DialogTagComponent,
    DeleteTagComponent
  ]
})
export class ManageTagsModule { }

