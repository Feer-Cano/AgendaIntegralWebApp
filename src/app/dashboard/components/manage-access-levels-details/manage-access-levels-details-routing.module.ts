import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessLevelsDetailsComponent } from './access-levels-details/access-levels-details.component';

const routes: Routes = [
  {
		path: '',
		children: [
			{ path: 'accessLevelDetails', component: AccessLevelsDetailsComponent },
			{ path: '**', redirectTo: '/not-found' }
		]
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAccessLevelsDetailsRoutingModule { }
