import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  maritalStatus: any[] = [
    { label: 'Soltera/Soltero', value: 'single' },
    { label: 'Casada/Casado', value: 'married' },
    { label: 'Divorciada/Divorciado', value: 'divorced' },
    { label: 'Viuda/Viudo', value: 'widowed' },
    { label: 'Union libre', value: 'domesticPartnership' }
  ];

  birthSex: any[]  = [
    { name: 'Mujer', value: 0 },
    { name: 'Hombre', value: 1 }
  ];

  constructor( 
    private apollo: Apollo 
    ) {}

    getPatients(): Observable<any> {

      return this.apollo
        .watchQuery({
          query: gql`
            query {
              getPatients {
                id,
                firstName,
                lastName,
                birthSex,
                birthDate,
                maritalStatus,
                medicalRecord,
                isActive
              }
            }
          `,
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
              patient(id: $id) {
                id,
                firstName,
                lastName,
                birthSex,
                birthDate,
                maritalStatus,
                medicalRecord,
                isActive
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

    console.log({patient})

    return this.apollo.mutate({
      mutation: gql`
        mutation createPatient(
          $firstName: String!,
          $lastName: String!,
          $birthSex: Int!,
          $birthDate: String!,
          $maritalStatus: String!
        ) {
          createPatient(
            firstName: $firstName,
            lastName: $lastName,
            birthSex: $birthSex,
            birthDate: $birthDate,
            maritalStatus: $maritalStatus,
          ) {
            id
          }
        }
      `,
      variables: { ...patient },
    }).pipe(
      map( (result: any) => result.data.createPatient )
    );
  }
}
