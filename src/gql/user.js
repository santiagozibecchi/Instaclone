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

export const UPDATE_AVATAR = gql`
     mutation updateAvatar($file: Upload) {
          updateAvatar(file: $file) {
               status
               urlAvatar
     }
}`;

// Todas estas son peticiones que le pedimos al servidor para que las ejecute
export const DELETE_AVATAR = gql`
     mutation deleteAvatar{
          deleteAvatar
}`;

// Ejemplo del objeto que devuelve
// Este objeto recibe el cliente haciendo uso del hook useMutation
// {
//      "data": {
//           "deleteAvatar": true
//      }
// }

export const UPDATE_USER = gql`
     mutation updateUser($input: UserUpdateInput){
          updateUser(input: $input)
}`;



