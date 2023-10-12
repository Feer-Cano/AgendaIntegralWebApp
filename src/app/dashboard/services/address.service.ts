import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map, take } from 'rxjs';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private apollo: Apollo
  ) { }

  getAddresses():Observable< any >{
    return this.apollo.watchQuery({
      query: gql`
      query{
        getAddresses {
          id,
          entityId,
          typeEntity,
          geocoder,
          street,
          extNumber,
          intNumber,
          neighborhood,
          city,
          state,
          country
        }
        }
    `,
    fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result:any) => result.data.getAddresses),
      take(1)
    );
  }
  getAddress(id: number):Observable< any >{
    return this.apollo.watchQuery({
      query: gql`
      query getAddress($id: ID!){
        getAddress(id: $id) {
          id,
          entityId,
          typeEntity,
          geocoder,
          street,
          extNumber,
          intNumber,
          neighborhood,
          city,
          state,
          country
        }
      }      
    `,
    variables: { id },
    fetchPolicy: 'network-only',
    }).valueChanges.pipe(
      map((result:any) => result.data.getAddress),
      take(1)
    );
  }
  createAddress( address: Address ): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createAddress(
          $entityId: Int!,
          $typeEntity: String!,
          $geocoder: String!,
          $street: String!,
          $extNumber: String!,
          $intNumber: String!,
          $neighborhood: String!,
          $city: String!,
          $state: String!,
          $country: String!
        ) {
          createAddress(
            entityId: $entityId,
            typeEntity: $typeEntity,
            geocoder: $geocoder,
            street: $street,
            extNumber: $extNumber,
            intNumber: $intNumber,
            neighborhood: $neighborhood,
            city: $city,
            state: $state,
            country: $country
          ) {
            id
          }
        }
      `,
      variables: { ...address },
    }).pipe(
      map( (result: any) => result.data.createAddress )
    );
  }

  updateAddress( address: Address ): Observable<any> {

    address = {
      ...address,
      id: Number( address.id ),
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation updateAddress(
          $id: Int!,
          $entityId: Int!,
          $typeEntity: String!,
          $geocoder: String!,
          $street: String!,
          $extNumber: String!,
          $intNumber: String!,
          $neighborhood: String!,
          $city: String!,
          $state: String!,
          $country: String!
        ) {
          updateAddress(
            id: $id,
            entityId: $entityId,
            typeEntity: $typeEntity,
            geocoder: $geocoder,
            street: $street,
            extNumber: $extNumber,
            intNumber: $intNumber,
            neighborhood: $neighborhood,
            city: $city,
            state: $state,
            country: $country
          ) {
            id
          }
        }
      `,
      variables: { ...address },
    }).pipe(
      map( (result: any) => result.data.updateAddress ),
      take(1)
    );
  }

  removeAddress( id: number ): Observable<any> {

    id = Number(id);

    return this.apollo.mutate({
      mutation: gql`
        mutation deleteAddress($id: Int!) {
          deleteAddress(
            id: $id
          ) {
            id
          }
        }
      `,
      variables: { id },
    }).pipe(
      map( (result: any) => result.data.deleteAddress ),
      take(1)
    );
  }
}
