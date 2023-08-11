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
                    { 
                        label: this.translator['sidebar']['generalAgenda'], 
                        icon: 'fa-regular fa-calendar-days', 
                        routerLink: ['/manage-agenda/agenda'] 
                    }
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
                                routerLink: ['/manage-users/user']
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
                            },
                            {
                              label: this.translator['sidebar']['hcpsTypesManagement'],
                              icon: 'fa-solid fa-id-card ',
                              routerLink: ['/manage-hcpsTypes/hcpTypes']
                            },
                            {
                              label: this.translator['sidebar']['entityManagement'],
                              icon: 'fa-solid fa-th-large',
                              routerLink: ['/manage-entities/entity']
                            },
                            {
                              label: this.translator['sidebar']['accessLevelManagement'],
                              icon: 'fa-solid fa-sitemap',
                              routerLink: ['/manage-accessLevels/accessLevel']
                            }
                        ]
                    },

                ]
            }
        ];
    }
}
