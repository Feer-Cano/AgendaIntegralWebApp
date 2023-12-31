import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './dashboard/components/notfound/notfound.component';

import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, 
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        ApolloModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: APOLLO_OPTIONS,
            useFactory(httpLink: HttpLink) {
              return {
                cache: new InMemoryCache(),
                link: httpLink.create({
                  uri: 'http://localhost:3003/graphql'
                }),
              };
            },
            deps: [HttpLink],
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
