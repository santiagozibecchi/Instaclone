import { gql } from "@apollo/client";

export const PUBLISH = gql`
   mutation publish($file: Upload) {
      publish(file: $file) {
         status
         urlFile
      }
   }
`;

export const GET_PUBLICATION = gql`
   query getPublications($username: String!) {
      getPublications(username: $username) {
         id
         idUser
         file
         typeFile
      }
   }
`;

export const GET_PUBLICATIONS_FOLLOWEDS = gql`
   query getPublicationsFolloweds {
      getPublicationsFolloweds {
         id
         idUser {
            name
            username
            avatar
         }
         file
         createAt
      }
   }
`;
