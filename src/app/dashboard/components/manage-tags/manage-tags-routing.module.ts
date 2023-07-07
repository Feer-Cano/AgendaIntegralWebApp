import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  {
		path: '',
		children: [
			{ path: 'tag', component: TagsComponent },
			{ path: '**', redirectTo: '/not-found' }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTagsRoutingModule { }


