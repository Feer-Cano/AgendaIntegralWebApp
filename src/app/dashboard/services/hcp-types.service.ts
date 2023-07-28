import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { HcpTypes } from '../models/hcp-types';

@Injectable({
  providedIn: 'root'
})


export class HcpTypesService {

  hcpTypes: any[]  = [];

  constructor(
    private apollo: Apollo
    ) {}

    getHcpTypes(isActive: number): Observable<any> {

      return this.apollo
        .watchQuery({
          query: gql`
            query getHCPTypes($isActive: Int!){
              getHCPTypes(isActive: $isActive){
                id,
                name,
                isActive
              }
            }
          `,
          variables: { isActive },
          fetchPolicy: 'network-only', // indica que siempre haga una solicitud al servidor
        })
        .valueChanges.pipe(
          map( (result: any) => result.data.getHCPTypes),
          take(1)
        );
    }

    getHcpType( id: number ): Observable<any> {

      return this.apollo
        .watchQuery({
          query: gql`
            query getHCPType($id: ID!) {
              hcpType(id: $id) {
                id,
                name,
                isActive
              }
            }
          `,
          variables: { id },
          fetchPolicy: 'network-only', // indica que siempre haga una solicitud al servidor
        })
        .valueChanges.pipe(
          map( (result: any) => result.data.getHCPType ),
          take(1)
        );
    }

  createHcpTypes( hcpTypes: HcpTypes ): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createHCPTypes(
          $name: String!,
          $isActive: Int!
        ) {
          createHCPTypes(
            name: $name,
            isActive: $isActive
          ) {
            id
          }
        }
      `,
      variables: { ...hcpTypes },
    }).pipe(
      map( (result: any) => result.data.createHCPTypes )
    );
  }

  updateHcpType( hcpTypes: HcpTypes ): Observable<any> {

    hcpTypes = {
      ...hcpTypes,
      id: Number( hcpTypes.id ),
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation updateHcptype(
          $id: Int!,
          $name: String!,
        ) {
          updateHcpType(
            id: $id,
            name: $name,
          ) {
            id
          }
        }
      `,
      variables: { ...hcpTypes },
    }).pipe(
      map( (result: any) => result.data.updateHcpType ),
      take(1)
    );
  }

  removeHcpType( id: number ): Observable<any> {

    id = Number(id);

    return this.apollo.mutate({
      mutation: gql`
        mutation removeHcpType($id: Int!) {
          removeHcpType(
            id: $id
          ) {
            id
          }
        }
      `,
      variables: { id },
    }).pipe(
      map( (result: any) => result.data.removeHcpType ),
      take(1)
    );
  }
}


