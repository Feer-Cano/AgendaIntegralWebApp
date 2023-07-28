import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Entity } from '../models/entity';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(
    private apollo: Apollo
  ) { }

  getEntities(): Observable<any> {

    return this.apollo
    .watchQuery({
      query: gql`
        query{
          getEntities{
            id,
            name,
          }
        }
      `,
      fetchPolicy: 'network-only',
    })
    .valueChanges.pipe(
      map((result: any) => result.data.getEntities),
      take(1)
    );
  }

  getEntity(id: number): Observable<Entity> {
    return this.apollo.watchQuery({
      query: gql`
        query getEntity($id: ID!) {
          getEntity(id: $id) {
            id,
            name,
          }
        }
      `,
      variables: { id },
      fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result: any) => result.data.getEntity),
      take(1)
    );
  }

  createEntity(entity: Entity): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createEntities(
          $name: String!,

        ) {
          createEntities(
            name: $name,
          ) {
            id
          }
        }
      `,
      variables: { ...entity },
    }).pipe(
      map((result: any) => result.data.createEntities)
    );
  }

  updateEntity( entity: Entity ): Observable<any> {

    entity = {
      ...entity,
      id: Number( entity.id ),
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation updateEntity(
          $id: Int!,
          $name: String!,
        ) {
          updateEntity(
            id: $id
            name: $name,
          ) {
            id
          }
        }
      `,
      variables: { ...entity },
    }).pipe(
      map( (result: any) => result.data.updateEntity ),
      take(1)
    );
  }

  removeEntity( id: number ): Observable<any> {

    id = Number(id);

    return this.apollo.mutate({
      mutation: gql`
        mutation removeEntity($id: Int!) {
          removeEntity(
            id: $id
          ) {
            id
          }
        }
      `,
      variables: { id },
    }).pipe(
      map( (result: any) => result.data.removeEntity ),
      take(1)
    );
  }
}
