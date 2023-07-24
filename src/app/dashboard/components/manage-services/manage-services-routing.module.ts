import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from "./services/services.component";

const routes: Routes = [
  {
		path: '',
		children: [
			{ path: 'service', component: ServicesComponent },
			{ path: '**', redirectTo: '/not-found' }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageServicesRoutingModule { }
