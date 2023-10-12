import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map, take } from 'rxjs';
import { Contacts } from '../models/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private apollo: Apollo
  ) { }

  getContacts():Observable< any >{
    return this.apollo.watchQuery({
      query: gql`
      query{
        getContacts {
          id,
          entityId,
          typeEntity,
          mobilePhone,
          homePhone,
          email
        }
        }
    `,
    fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result:any) => result.data.getContacts),
      take(1)
    );
  }
  getContact(id: number):Observable< any >{
    return this.apollo.watchQuery({
      query: gql`
      query getContact($id: ID!){
        getContact(id: $id) {
            id,
            entityId,
            typeEntity,
            mobilePhone,
            homePhone,
            email
        }
      }      
    `,
    variables: { id },
    fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result:any) => result.data.getContact),
      take(1)
    );
  }
  createContacts( contacts: Contacts ): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createContacts(
          $entityId: Int!,
          $typeEntity: String!,
          $mobilePhone: String!,
          $homePhone: String!,
          $email: String!,
        ) {
          createContacts(
            entityId: $entityId,
            typeEntity: $typeEntity,
            mobilePhone: $mobilePhone,
            homePhone: $homePhone,
            email: $email,
          ) {
            id
          }
        }
      `,
      variables: { ...contacts },
    }).pipe(
      map( (result: any) => result.data.createContacts )
    );
  }

 }
