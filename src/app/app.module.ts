import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './dashboard/components/notfound/notfound.component';
import { ProductService } from './dashboard/services/product.service';
import { CountryService } from './dashboard/services/country.service';
import { CustomerService } from './dashboard/services/customer.service';
import { EventService } from './dashboard/services/event.service';
import { IconService } from './dashboard/services/icon.service';
import { NodeService } from './dashboard/services/node.service';
import { PhotoService } from './dashboard/services/photo.service';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
