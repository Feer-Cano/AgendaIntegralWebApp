import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Administrar Pacientes',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Pacientes',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/manage-patients/patient']
                            },
                            {
                                label: 'Parejas Sexuales',
                                icon: 'pi pi-heart-fill',
                                routerLink: ['/auth/error']
                            }
                        ]
                    },
                    {
                      label: 'Administrar Personal',
                      icon: 'pi pi-plus-circle pi-tag',
                      items: [
                          {
                              label: 'Personal',
                              icon: 'pi pi-fw pi-sign-in',
                              routerLink: ['/manage-hcps/hcp']
                          }
                      ]
                  },
                    {
                      label: 'Administrar Etiquetas',
                      icon: 'pi pi-fw pi-tag',
                      items: [
                          {
                              label: 'Etiquetas',
                              icon: 'pi pi-fw pi-sign-in',
                              routerLink: ['/manage-tags/tag']
                          }
                      ]
                  }

                ]
            }
        ];
    }
}
