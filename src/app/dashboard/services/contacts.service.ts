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
  createContact( contacts: Contacts ): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createAddress(
          $entityId: Int!,
          $typeEntity: String!,
          $mobilePhone: String!,
          $homePhone: String!,
          $email: String!,
        ) {
          createAddress(
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
      map( (result: any) => result.data.createContact )
    );
  }

//   updateAddress( address: Contacts ): Observable<any> {

//     address = {
//       ...address,
//       id: Number( address.id ),
//     }

//     return this.apollo.mutate({
//       mutation: gql`
//         mutation updateAddress(
//           $id: Int!,
//           $entityId: Int!,
//           $typeEntity: String!,
//           $geocoder: String!,
//           $street: String!,
//           $extNumber: String!,
//           $intNumber: String!,
//           $neighborhood: String!,
//           $city: String!,
//           $state: String!,
//           $country: String!
//         ) {
//           updateAddress(
//             id: $id,
//             entityId: $entityId,
//             typeEntity: $typeEntity,
//             geocoder: $geocoder,
//             street: $street,
//             extNumber: $extNumber,
//             intNumber: $intNumber,
//             neighborhood: $neighborhood,
//             city: $city,
//             state: $state,
//             country: $country
//           ) {
//             id
//           }
//         }
//       `,
//       variables: { ...address },
//     }).pipe(
//       map( (result: any) => result.data.updateAddress ),
//       take(1)
//     );
//   }

//   removeAddress( id: number ): Observable<any> {

//     id = Number(id);

//     return this.apollo.mutate({
//       mutation: gql`
//         mutation deleteAddress($id: Int!) {
//           deleteAddress(
//             id: $id
//           ) {
//             id
//           }
//         }
//       `,
//       variables: { id },
//     }).pipe(
//       map( (result: any) => result.data.deleteAddress ),
//       take(1)
//     );
//   }

 }
