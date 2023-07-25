import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HcpsTypesComponent } from './hcps-types/hcps-types.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: 'hcpTypes', component: HcpsTypesComponent },
			{ path: '**', redirectTo: '/not-found' }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageHcpsTypesRoutingModule { }
