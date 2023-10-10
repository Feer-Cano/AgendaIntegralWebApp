import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

    constructor(
    private apollo: Apollo
    ) {}

    birthSex: any[]  = [
      { name: 'Mujer', value: 0, badge: 'women' },
      { name: 'Hombre', value: 1, badge: 'man' }
    ];
    getUsers(isActive: number): Observable<any> {

      return this.apollo
        .watchQuery({
          query: gql`
            query getUsers($isActive: Int!){
              getUsers(isActive: $isActive){
                id,
                firstName,
                lastName,
                birthSex,
                birthDate,
                mobilePhone,
                email,
                password,
                token,
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
          map( (result: any) => result.data.getUsers),
          take(1)
        );
    }

    getUser( id: number ): Observable<any> {

      return this.apollo
        .watchQuery({
          query: gql`
            query getUser($id: ID!) {
              getUser(id: $id) {
                id,
                firstName,
                lastName,
                birthSex,
                birthDate,
                mobilePhone,
                email,
                password,
                token,
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
          map( (result: any) => result.data.getUser ),
          take(1)
        );
    }

  createUser( user: User ): Observable<any> {
    console.log("Resulto> ", user)
    return this.apollo.mutate({
      mutation: gql`
        mutation createUser(
          $firstName: String!,
          $lastName: String!,
          $birthSex: Int!,
          $birthDate: String!,
          $mobilePhone: String!,
          $email: String!,
          $password: String!,
          $isActive: Int!
        ) {
          createUser(
          firstName:$firstName,
          lastName:$lastName,
          birthSex:$birthSex,
          birthDate:$birthDate,
          mobilePhone:$mobilePhone,
          email:$email,
          password:$password,
          isActive:$isActive
          ) {
            id
          }
        }
      `,
      variables: { ...user },
    }).pipe(
      map( (result: any) => result.data.createUser )
    );
  }

  updateUser( user: User ): Observable<any> {

    user = {
      ...user,
      id: Number( user.id ),
    }

    return this.apollo.mutate({
      mutation: gql`
        mutation updateUser(
          $id: Int!,
          $firstName: String!,
          $lastName: String!,
          $birthSex: Int!,
          $birthDate: String!,
          $mobilePhone: String!,
          $email: String!,
          $password: String!,
          $isActive: Int!
        ) {
          updateUser(
            id: $id,
            firstName:$firstName,
            lastName:$lastName,
            birthSex:$birthSex,
            birthDate:$birthDate,
            mobilePhone:$mobilePhone,
            email:$email,
            password:$password,
            isActive:$isActive
          ) {
            id
          }
        }
      `,
      variables: { ...user },
    }).pipe(
      map( (result: any) => result.data.updateUser ),
      take(1)
    );
  }

  removeUser( id: number ): Observable<any> {

    id = Number(id);

    return this.apollo.mutate({
      mutation: gql`
        mutation removeUser($id: Int!) {
          removeUser(
            id: $id
          ) {
            id
          }
        }
      `,
      variables: { id },
    }).pipe(
      map( (result: any) => result.data.removeUser ),
      take(1)
    );
  }
}


