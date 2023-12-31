import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  maritalStatus: any[] = [
    { label: 'Soltera(o)', value: 'SINGLE' },
    { label: 'Casada(o)', value: 'MARRIED' },
    { label: 'Divorciada(o)', value: 'DIVORCED' },
    { label: 'Viuda(o)', value: 'WIDOWED' },
    { label: 'Union libre', value: 'DOMESTIC_PARTNERSHIP' }
  ];

  birthSex: any[]  = [
    { name: 'Mujer', value: 0, badge: 'women' },
    { name: 'Hombre', value: 1, badge: 'man' }
  ];

  constructor(
    private apollo: Apollo
  ) {}

  getPatients( isActive: number ): Observable<any> {

    return this.apollo
      .watchQuery({
        query: gql`
        query getPatients($isActive: Int!) {
          getPatients(isActive: $isActive) {
            id,
            firstName,
            lastName,
            birthSex,
            birthDate,
            maritalStatus,
            medicalRecord,
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
        map( (result: any) => result.data.getPatients ),
        take(1)
      );
  }

  getPatient( id: number ): Observable<any> {

    return this.apollo
      .watchQuery({
        query: gql`
          query getPatient($id: ID!) {
            getPatient(id: $id) {
              id,
              firstName,
              lastName,
              birthSex,
              birthDate,
              maritalStatus,
              medicalRecord,
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
        map( (result: any) => result.data.getPatient ),
        take(1)
      );
  }

  createPatient( patient: Patient ): Observable<any> {

    return this.apollo.mutate({
      mutation: gql`
        mutation createPatient(
          $firstName: String!,
          $lastName: String!,
          $birthSex: Int!,
          $birthDate: String!,
          $maritalStatus: String!,
          $isActive: Int!
        ) {
          createPatient(
            firstName: $firstName,
            lastName: $lastName,
            birthSex: $birthSex,
            birthDate: $birthDate,
            maritalStatus: $maritalStatus,
            isActive: $isActive
          ) {
            id
          }
        }
      `,
      variables: { ...patient },
    }).pipe(
      map( (result: any) => result.data.createPatient ),
    );
  }

  updatePatient( patient: Patient ): Observable<any> {

    patient = {
      ...patient,
      id: Number( patient.id ),
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation updatePatient(
          $id: Int!,
          $firstName: String!,
          $lastName: String!,
          $birthSex: Int!,
          $birthDate: String!,
          $maritalStatus: String!,
          $isActive: Int!
        ) {
          updatePatient(
            id: $id,
            firstName: $firstName,
            lastName: $lastName,
            birthSex: $birthSex,
            birthDate: $birthDate,
            maritalStatus: $maritalStatus,
            isActive: $isActive
          ) {
            id
          }
        }
      `,
      variables: { ...patient },
    }).pipe(
      map( (result: any) => result.data.updatePatient ),
      take(1)
    );
  }

  removePatient( id: number ): Observable<any> {

    id = Number(id);

    return this.apollo.mutate({
      mutation: gql`
        mutation removePatient($id: Int!) {
          removePatient(
            id: $id
          ) {
            id
          }
        }
      `,
      variables: { id } ,
    }).pipe(
      map( (result: any) => result.data.removePatient ),
      take(1)
    );
  }
}
