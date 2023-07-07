import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './dashboard/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    {
                        path: 'manage-patients', loadChildren: () => import('./dashboard/components/manage-patients/manage-patients.module').then(m => m.ManagePatientsModule)
                    }
                ]
            },
            {
              path: '', component: AppLayoutComponent,
              children: [
                  {
                       path: 'manage-tags', loadChildren: () => import('./dashboard/components/manage-tags/manage-tags.module').then(m => m.ManageTagsModule)
                  }
              ]
          },
            { path: 'auth', loadChildren: () => import('./dashboard/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
