import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccessLevel } from '../models/access-level';

@Injectable({
  providedIn: 'root'
})
export class AccessLevelService {

  constructor( private apollo: Apollo ) { }

  getAccesLevels(): Observable<AccessLevel[]> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAccessLevels {
            id,
            userId,
            entity,
            permission
          }
        }
      `,
      fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result: any) => result.data.getAccesLevels),
      take(1)
    );
  }

  getAccesLevel(id: number): Observable<AccessLevel> {
    return this.apollo.watchQuery({
      query: gql`
        query getAccesLevel($id: ID!) {
          accesLevel(id: $id) {
            id,
            userId,
            entity,
            permission
          }
        }
      `,
      variables: { id },
      fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result: any) => result.data.getAccesLevel),
      take(1)
    );
  }

  createAccesLevel(accessLevel: AccessLevel): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createAccesLevel(
          $userId: Int!,
          $entity: String!,
          $permission: String!,
        ) {
          createAccesLevel(
            userId: $userId,
            entity: $entity,
            permission: $permission,
          ) {
            id
          }
        }
      `,
      variables: { ...accessLevel},
    }).pipe(
      map((result: any) => result.data.createAccesLevel),
      take(1)
    );
  }

  updateAccesLevel( accessLevel: AccessLevel ): Observable<any> {

    accessLevel = {
      ...accessLevel,
      id: Number( accessLevel.id ),
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation updateAccesLevel(
          $id: Int!,
          $userId: Int!,
          $entity: String!,
          $permission: String!,
        ) {
          updateAccesLevel(
            id: $id
            userId: $userId,
            entity: $entity,
            permission: $permission,
          ) {
            id
          }
        }
      `,
      variables: { ...accessLevel },
    }).pipe(
      map( (result: any) => result.data.updateAccesLevel ),
      take(1)
    );
  }

  deleteAccesLevel( id: number ): Observable<any> {

    id = Number(id);

    return this.apollo.mutate({
      mutation: gql`
        mutation deleteAccesLevel($id: Int!) {
          deleteAccesLevel(
            id: $id
          ) {
            id
          }
        }
      `,
      variables: { id },
    }).pipe(
      map( (result: any) => result.data.deleteAccesLevel ),
      take(1)
    );
  }
}

