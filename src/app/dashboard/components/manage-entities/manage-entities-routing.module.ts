import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesComponent } from './entities/entities.component';

const routes: Routes = [
  {
		path: '',
		children: [
			{ path: 'entity', component: EntitiesComponent },
			{ path: '**', redirectTo: '/not-found' }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageEntitiesRoutingModule { }
