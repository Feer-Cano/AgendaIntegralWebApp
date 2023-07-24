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
            description: $description
          ) {
            id
          }
        }
      `,
      variables: { ...service },
    }).pipe(
      map( (result: any) => result.data.createService )
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
              description
            }
          }
        `,
        variables: { isActive },
        fetchPolicy: 'network-only', // indica que siempre haga una solicitud al servidor
      })
      .valueChanges.pipe( 
        map( (result: any) => result.data.getServices ),
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
              description
            }
          }
        `,
        variables: { id },
      })
      .valueChanges.pipe( 
        map( (result: any) => result.data.getService ),
        take(1) 
      );
  }  

  deleteService( id: number ): Observable<any> {

    id = Number( id );

    return this.apollo.mutate({
      mutation: gql`
        mutation deleteService($id: Int!) {
          deleteService(id: $id) {
            status
            message
          }
        }
      `,
      variables: { id },
    }).pipe(
      map( (result: any) => result.data.deleteService )
    );
  }
}
