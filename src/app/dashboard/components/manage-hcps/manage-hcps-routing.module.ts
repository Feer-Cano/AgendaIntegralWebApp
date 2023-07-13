import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HcpsComponent } from './hcps/hcps.component';

const routes: Routes = [
  {
		path: '',
		children: [
			{ path: 'hcp', component: HcpsComponent },
			{ path: '**', redirectTo: '/not-found' }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageHcpsRoutingModule { }
