import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

import { TranslateData } from "src/app/dashboard/interfaces/translate-data";
import { TranslateService } from 'src/app/dashboard/services/translate.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    translator: TranslateData = {};

    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private translateService: TranslateService
    ) {}

    ngOnInit() {

        this.translateService.getTranslations().subscribe( (translations: TranslateData) => {
            this.translator = translations;
        });

        this.model = [
            {
                label: this.translator['sidebar']['home'],
                items: [
                    { label: this.translator['sidebar']['generalAgenda'], icon: 'fa-regular fa-calendar-days', routerLink: ['/'] }
                ]
            },
            {
                label: this.translator['sidebar']['modules'],
                items: [
                    {
                        label: this.translator['sidebar']['patients'],
                        icon: 'fa-solid fa-hospital-user',
                        items: [
                            {
                                label: this.translator['sidebar']['patientManagement'],
                                icon: 'fa-solid fa-people-arrows',
                                routerLink: ['/manage-patients/patient']
                            },
                            {
                                label: this.translator['sidebar']['couplesManagement'],
                                icon: 'pi pi-heart-fill',
                                routerLink: ['/auth/error']
                            }
                        ]
                    },
                    {
                      label: this.translator['sidebar']['collaborators'],
                      icon: 'fa-solid fa-users-gear',
                      items: [
                            {
                                label: this.translator['sidebar']['hcpManagement'],
                                icon: 'fa-solid fa-user-nurse',
                                routerLink: ['/manage-hcps/hcp']
                            },
                            {
                                label: this.translator['sidebar']['userManagement'],
                                icon: 'fa-solid fa-user',
                                routerLink: ['/manage-hcps/hcp']
                            }
                        ]
                    },
                    {
                        label: this.translator['sidebar']['administrativeModules'],
                        icon: 'fa-solid fa-toolbox',
                        items: [
                            {
                                label: this.translator['sidebar']['serviceManagement'],
                                icon: 'fa-solid fa-circle-dollar-to-slot',
                                routerLink: ['/manage-services/service']
                            },
                            {
                                label: this.translator['sidebar']['tagManagement'],
                                icon: 'fa-solid fa-tag',
                                routerLink: ['/manage-tags/tag']
                            }
                        ]
                    },

                ]
            }
        ];
    }
}
