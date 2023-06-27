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
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
