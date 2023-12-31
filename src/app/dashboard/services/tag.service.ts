import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private apollo: Apollo
  ) {}

  getTags(): Observable<Tag[]> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getTags {
            id,
            typeEntityId {
              id,
              name
            },
            name,
          }
        }
      `,
      fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result: any) => result.data.getTags),
      take(1)
    );
  }

  getTag(id: number): Observable<Tag> {
    return this.apollo.watchQuery({
      query: gql`
        query getTag($id: ID!) {
          tag(id: $id) {
            id,
            typeEntityId,
            name,
          }
        }
      `,
      variables: { id },
      fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result: any) => result.data.getTag),
      take(1)
    );
  }

  createTags(tag: Tag): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createTags(
          $name: String!,
          $typeEntityId: Int!,
        ) {
          createTags(
            name: $name,
            typeEntityId: $typeEntityId,
          ) {
            id
          }
        }
      `,
      variables: { ...tag},
    }).pipe(
      map((result: any) => result.data.createTags),
      take(1)
    );
  }

  updateTag( tag: Tag ): Observable<any> {

    tag = {
      ...tag,
      id: Number( tag.id ),
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation updateTag(
          $id: Int!,
          $name: String!,
          $typeEntityId: Int!,
        ) {
          updateTag(
            id: $id
            name: $name,
            typeEntityId: $typeEntityId,
          ) {
            id
          }
        }
      `,
      variables: { ...tag },
    }).pipe(
      map( (result: any) => result.data.updateTag ),
      take(1)
    );
  }

  deleteTag( id: number ): Observable<any> {

    id = Number(id);

    return this.apollo.mutate({
      mutation: gql`
        mutation deleteTag($id: Int!) {
          deleteTag(
            id: $id
          ) {
            id
          }
        }
      `,
      variables: { id },
    }).pipe(
      map( (result: any) => result.data.deleteTag ),
      take(1)
    );
  }
}
