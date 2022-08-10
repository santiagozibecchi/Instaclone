import { gql } from '@apollo/client';

export const REGISTER = gql`
     mutation register($input: UserInput) {
          register(input: $input) {
               id
               name
               email
               username
               password
     }
}`;

export const LOGIN = gql`
     mutation login($input: LoginInput) {
          login(input: $input) {
          token
     }
}`;

export const GET_USER = gql`
     query getUser($id: ID, $username: String) {
          getUser(id: $id, username: $username) {
               id
               name
               username
               email
               description
               siteWeb
               avatar
          }
}`;