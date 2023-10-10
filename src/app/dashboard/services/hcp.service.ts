import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Hcp } from './../models/hcp';


@Injectable({
  providedIn: 'root'
})
export class HcpService {

  type: any[] = [
    { label: 'Interno', value: 'INTERNAL' },
    { label: 'Externo', value: 'EXTERNAL' }
  ];

  birthSex: any[]  = [
    { name: 'Mujer', value: 0, badge: 'women' },
    { name: 'Hombre', value: 1, badge: 'man' }
  ];

  constructor(
    private apollo: Apollo
    ) {}

    getHCPS(isActive: number): Observable<any> {

      return this.apollo
        .watchQuery({
          query: gql`
            query getHCPS($isActive: Int!){
              getHCPS(isActive: $isActive){
                id,
                hcpType{
                  id,
                  name
                },
                firstName,
                lastName,
                birthSex,
                birthDate,
                professionalLicense,
                type,
                isActive,
                contacts{
                  id,
                  entityId,
                  typeEntity,
                  mobilePhone,
                  homePhone,
                  email
                }
                addresses{
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
            }
          `,
          variables: { isActive },
          fetchPolicy: 'network-only', // indica que siempre haga una solicitud al servidor
        })
        .valueChanges.pipe(
          map( (result: any) => result.data.getHCPS),
          take(1)
        );
    }

    getHCP( id: number ): Observable<any> {

      return this.apollo
        .watchQuery({
          query: gql`
            query getHCP($id: ID!) {
              hcp(id: $id) {
                id,
                hcpType{
                  id,
                  name
                },
                firstName,
                lastName,
                birthSex,
                birthDate,
                professionalLicense,
                type,
                isActive,
                contacts{
                  id,
                  entityId,
                  typeEntity,
                  mobilePhone,
                  homePhone,
                  email
                }
                addresses{
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
            }
          `,
          variables: { id },
          fetchPolicy: 'network-only', // indica que siempre haga una solicitud al servidor
        })
        .valueChanges.pipe(
          map( (result: any) => result.data.getHCP ),
          take(1)
        );
    }

  createHcp( hcp: Hcp ): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createHCP(
          $hcpTypeId: Int!,
          $firstName: String!,
          $lastName: String!,
          $birthSex: Int!,
          $birthDate: String!,
          $professionalLicense: String!,
          $type: String!,
          $isActive: Int!
        ) {
          createHCP(
            hcpTypeId: $hcpTypeId,
            firstName: $firstName,
            lastName: $lastName,
            birthSex: $birthSex,
            birthDate: $birthDate,
            professionalLicense: $professionalLicense,
            type: $type,
            isActive: $isActive
          ) {
            id
          }
        }
      `,
      variables: { ...hcp },
    }).pipe(
      map( (result: any) => result.data.createHCP )
    );
  }


  updateHcp( hcp: Hcp ): Observable<any> {

    hcp = {
      ...hcp,
      id: Number( hcp.id ),
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation updateHcp(
          $id: Int!,
          $hcpTypeId: Int!,
          $firstName: String!,
          $lastName: String!,
          $birthSex: Int!,
          $birthDate: String!,
          $professionalLicense: String!,
          $type: String!,
        ) {
          updateHcp(
            id: $id,
            hcpTypeId: $hcpTypeId,
            firstName: $firstName,
            lastName: $lastName,
            birthSex: $birthSex,
            birthDate: $birthDate,
            professionalLicense: $professionalLicense,
            type: $type,
          ) {
            id
          }
        }
      `,
      variables: { ...hcp },
    }).pipe(
      map( (result: any) => result.data.updateHcp ),
      take(1)
    );
  }

  removeHcp( id: number ): Observable<any> {

    id = Number(id);

    return this.apollo.mutate({
      mutation: gql`
        mutation removeHcp($id: Int!) {
          removeHcp(
            id: $id
          ) {
            id
          }
        }
      `,
      variables: { id },
    }).pipe(
      map( (result: any) => result.data.removeHcp ),
      take(1)
    );
  }
}
