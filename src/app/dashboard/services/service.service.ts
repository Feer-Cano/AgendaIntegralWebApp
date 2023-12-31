import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private apollo: Apollo
  ) {}
  
  createService( service: Service ): Observable<any> {

    return this.apollo.mutate({
      mutation: gql`
        mutation createService(
          $name: String!,
          $description: String!
        ) {
          createService(
            name: $name,
            description: $description,
            isActive: 1
          ) {
            id
          }
        }
      `,
      variables: { ...service },
    }).pipe(
      map( (result: any) => result.data.createService ),
      take(1)
    );
  }
  
  updateService( service: Service ): Observable<any> {

    service = {
      ...service,
      id: Number( service.id )
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation updateService(
          $id: Int!,
          $name: String!,
          $description: String!
        ) {
          updateService(
            id: $id,
            name: $name,
            description: $description
          ) {
            id
          }
        }
      `,
      variables: { ...service },
    }).pipe(
      map( (result: any) => result.data.updateService ),
      take(1)
    );
  }

  getServices( isActive: number ): Observable<any> {

    return this.apollo
      .watchQuery({
        query: gql`
          query getServices($isActive: Int!) {
            getServices(isActive: $isActive) {
              id,
              name,
              description,
              costs {
                id,
                cost,
                createdAt
              }
            }
          }
        `,
        variables: { isActive },
        fetchPolicy: 'network-only', // Indica que siempre haga una solicitud al servidor
      })
      .valueChanges.pipe(
        map((result: any) => {
          // Ordenamos de mayor a menor por fecha de creacion y creamos una copia profunda de costs
          return result.data.getServices.map( (service: any) => ({
            ...service,
            costs: Array.from( service.costs ).sort( (a: any, b: any) => b.createdAt - a.createdAt ) 
          }));
        }),
        take(1)
      );
  }

  getService( id: number ): Observable<any> {

    return this.apollo
      .watchQuery({
        query: gql`
          query getService($id: ID!) {
            getService(id: $id) {
              id,
              name,
              description,
              costs {
                id,
                cost,
                createdAt
              }
            }
          }
        `,
        variables: { id },
      })
      .valueChanges.pipe(
        map((result: any) => {
          // Ordenamos de mayor a menor por fecha de creacion
          return result.data.getServices.map( (service: any) => ({
            ...service,
            costs: Array.from( service.costs ).sort( (a: any, b: any) => b.createdAt - a.createdAt ) 
          }));
        }),
        take(1)
      );
  }  

  removeService( service: Service ): Observable<any> {

    service = {
      ...service,
      id: Number( service.id )
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation removeService(
          $id: Int!
          ) {
          removeService(
            id: $id
          ) {
            id
          }
        }
      `,
      variables: { ...service } ,
    }).pipe(
      map( (result: any) => result.data.removeService ),
      take(1)
    );
  }
}
