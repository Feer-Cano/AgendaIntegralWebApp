import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessLevelsComponent } from './access-levels/access-levels.component';

const routes: Routes = [
  {
		path: '',
		children: [
			{ path: 'accessLevel', component: AccessLevelsComponent },
			{ path: '**', redirectTo: '/not-found' }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAccessLevelsRoutingModule { }
