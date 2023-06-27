import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: 'patient', component: PatientsComponent },
			{ path: '**', redirectTo: '/not-found' }
		]
	}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePatientsRoutingModule { }
