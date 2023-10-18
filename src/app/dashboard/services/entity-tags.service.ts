import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map, take } from 'rxjs';
import { EntityTag } from '../interfaces/entity-tags';
@Injectable({
  providedIn: 'root'
})
export class EntityTagsService {

  constructor(
    private apollo:Apollo
  ) { }

  getEntityTags():Observable< any >{
    return this.apollo.watchQuery({
      query: gql`
      query{
        getEntityTags {
          id,
          entityId,
          typeEntity,
          tagId,
          tag{
            id,
            name
          }
        }
        }
    `,
    fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result:any) => result.data.getEntityTags),
      take(1)
    );
  }
  getEntityTag(id: number):Observable< any >{
    return this.apollo.watchQuery({
      query: gql`
      query getEntityTag($id: ID!){
        getEntityTag(id: $id) {
          id,
          entityId,
          typeEntity,
          tagId,
          tag{
            id,
            name
          }
        }
      }      
    `,
    variables: { id },
    fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result:any) => result.data.getEntityTag),
      take(1)
    );
  }
  createEntityTag( entityTag: EntityTag ): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createEntityTag(
          $entityId: Int!,
          $typeEntity: String!,
          $tagId: Int!,
        ) {
          createEntityTag(
            entityId: $entityId,
            typeEntity: $typeEntity,
            tagId: $tagId,
          ) {
            id
          }
        }
      `,
      variables: { ...entityTag },
    }).pipe(
      map( (result: any) => result.data.createEntityTag )
    );
  }

  updateEntityTag( entityTag: EntityTag ): Observable<any> {

    entityTag = {
      ...entityTag,
      id: Number( entityTag.id ),
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation updateEntityTag(
          $id: Int!,
          $entityId: Int!,
          $typeEntity: String!,
          $tagId: Int!,
        ) {
          updateEntityTag(
            id: $id,
            entityId: $entityId,
            typeEntity: $typeEntity,
            tagId: $tagId,
          ) {
            id
          }
        }
      `,
      variables: { ...entityTag },
    }).pipe(
      map( (result: any) => result.data.updateEntityTag ),
      take(1)
    );
  }

  deleteEntityTag( id: number ): Observable<any> {

    id = Number(id);

    return this.apollo.mutate({
      mutation: gql`
        mutation deleteEntityTag($id: Int!) {
          deleteEntityTag(
            id: $id
          ) {
            id
          }
        }
      `,
      variables: { id },
    }).pipe(
      map( (result: any) => result.data.deleteEntityTag ),
      take(1)
    );
  }

}
