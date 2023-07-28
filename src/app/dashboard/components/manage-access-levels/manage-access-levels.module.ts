import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAccessLevelsRoutingModule } from './manage-access-levels-routing.module';
import { AccessLevelsComponent } from './access-levels/access-levels.component';
import { DialogAccessLevelComponent } from './access-levels/dialogs/dialog-access-level/dialog-access-level.component';
import { DeleteAccessLevelComponent } from './access-levels/dialogs/delete-access-level/delete-access-level.component';


@NgModule({
  declarations: [
    AccessLevelsComponent,
    DialogAccessLevelComponent,
    DeleteAccessLevelComponent
  ],
  imports: [
    CommonModule,
    ManageAccessLevelsRoutingModule
  ]
})
export class ManageAccessLevelsModule { }
