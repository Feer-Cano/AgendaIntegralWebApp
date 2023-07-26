import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CostServices } from '../interfaces/costs-services';

@Injectable({
  providedIn: 'root'
})
export class ServiceCostService {

  constructor(
    private apollo: Apollo
  ) { }

  createServiceCost( costServices: CostServices ): Observable<any> {

    costServices = {
      ...costServices,
      serviceId: Number( costServices.serviceId )
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation createServiceCost(
          $serviceId: Int!,
          $cost: Float!
        ) {
          createServiceCost(
            serviceId: $serviceId,
            cost: $cost
          ) {
            id
          }
        }
      `,
      variables: { ...costServices },
    }).pipe(
      map( (result: any) => result.data.createServiceCost )
    );
  }
  
  updateServiceCost( costServices: CostServices ): Observable<any> {

    costServices = {
      ...costServices,
      id: Number( costServices.id )
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation updateServiceCost(
          $id: Int!,
          $serviceId: Int!,
          $cost: Float!
        ) {
          updateServiceCost(
            id: $id,
            serviceId: $serviceId,
            cost: $cost
          ) {
            id
          }
        }
      `,
      variables: { ...costServices },
    }).pipe(
      map( (result: any) => result.data.updateServiceCost ),
      take(1)
    );
  }

  getServiceCosts(): Observable<any> {

    return this.apollo
      .watchQuery({
        query: gql`
          query getServiceCosts() {
            getServiceCosts() {
              id,
              serviceId,
              cost,
              createdAt
            }
          }
        `,
        fetchPolicy: 'network-only', // indica que siempre haga una solicitud al servidor
      })
      .valueChanges.pipe( 
        map( (result: any) => result.data.getServiceCosts ),
        take(1) 
      );
  }

  getServiceCost( id: number ): Observable<any> {

    return this.apollo
      .watchQuery({
        query: gql`
          query getServiceCost($id: ID!) {
            getServiceCost(id: $id) {
              id,
              serviceId,
              cost,
              createdAt
            }
          }
        `,
        variables: { id },
      })
      .valueChanges.pipe( 
        map( (result: any) => result.data.getServiceCost ),
        take(1) 
      );
  }  

  deleteServiceCost( id: number ): Observable<any> {

    id = Number( id );

    return this.apollo.mutate({
      mutation: gql`
        mutation deleteServiceCost($id: Int!) {
          deleteServiceCost(id: $id) {
            status
            message
          }
        }
      `,
      variables: { id },
    }).pipe(
      map( (result: any) => result.data.deleteServiceCost )
    );
  }
}
