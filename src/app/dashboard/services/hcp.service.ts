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
    { name: 'Mujer', value: 1 },
    { name: 'Hombre', value: 2 }
  ];

  hcpTypeId: any[] = [];
  constructor(
    private apollo: Apollo
    ) {this.loadEntities();}

    loadEntities() {
      this.getHCPS().subscribe((hcps: any[]) => {
        this.hcpTypeId = hcps.map(hcp => ({ label: hcp.hcpTypeId?.id as number, value: hcp.hcpTypeId?.id as number }));
      });
    }

    getHCPS(): Observable<any> {

      return this.apollo
        .watchQuery({
          query: gql`
            query {
              getHCPS{
                id,
                hcpTypeId{
                  name
                },
                firstName,
                lastName,
                birthSex,
                birthDate,
                professionalLicense,
                type,
                isActive
              }
            }
          `,
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
                hcpTypeId{
                  name
                },
                firstName,
                lastName,
                birthSex,
                birthDate,
                professionalLicense,
                type,
                isActive
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

    console.log({hcp})

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
          $isActive: Int!
        ) {
          updateHcp(
            id: $id
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
      map( (result: any) => result.data.updateHcp ),
      take(1)
    );
  }

}
