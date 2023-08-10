import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccessLevel } from '../models/access-level';

@Injectable({
  providedIn: 'root'
})
export class AccessLevelService {

  permission: any[] = [
    { label: 'Lector', value: 'READ' },
    { label: 'Editor', value: 'EDIT' },
    { label: 'Administrador', value: 'ADMIN' }
  ];

  constructor( private apollo: Apollo ) { }

  getAccessLevels(): Observable<AccessLevel[]> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAccessLevels {
            id,
            user{
              id,
              firstName
            },
            typeEntity{
              id,
              name
            },
            permission
          }
        }
      `,
      fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result: any) => result.data.getAccessLevels),
      take(1)
    );
  }

  getAccessLevel(id: number): Observable<AccessLevel> {
    return this.apollo.watchQuery({
      query: gql`
        query getAccesLevel($id: ID!) {
          accesLevel(id: $id) {
            id,
            user{
              id,
              firstName
            },
            typeEntity{
              id,
              name
            },
            permission
          }
        }
      `,
      variables: { id },
      fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result: any) => result.data.getAccessLevel),
      take(1)
    );
  }

  createAccessLevel(accessLevel: AccessLevel): Observable<any> {
    console.log("Jelouy", accessLevel);
    return this.apollo.mutate({
      mutation: gql`
        mutation createAccessLevel(
          $user: Int!,
          $typeEntity: Int!,
          $permission: String!,
        ) {
          createAccessLevel(
            userId: $user,
            typeEntityId:  $typeEntity,
            permission: $permission,
          ) {
            id
          }
        }
      `,
      variables: { ...accessLevel},
    }).pipe(
      map((result: any) => result.data.createAccessLevel),
      take(1)
    );
  }

  updateAccessLevel( accessLevel: AccessLevel ): Observable<any> {

    accessLevel = {
      ...accessLevel,
      id: Number( accessLevel.id ),
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation updateAccessLevel(
          $id: Int!,
          $user: Int!,
          $typeEntity: Int!,
          $permission: String!,
        ) {
          updateAccessLevel(
            id: $id
            userId: $user,
            typeEntityId: $typeEntity,
            permission: $permission,
          ) {
            id
          }
        }
      `,
      variables: { ...accessLevel },
    }).pipe(
      map( (result: any) => result.data.updateAccessLevel ),
      take(1)
    );
  }

  deleteAccessLevel( id: number ): Observable<any> {

    id = Number(id);

    return this.apollo.mutate({
      mutation: gql`
        mutation deleteAccessLevel($id: Int!) {
          deleteAccessLevel(
            id: $id
          ) {
            id
          }
        }
      `,
      variables: { id },
    }).pipe(
      map( (result: any) => result.data.deleteAccessLevel ),
      take(1)
    );
  }
}

