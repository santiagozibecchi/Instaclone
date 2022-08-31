import { gql } from "@apollo/client";

export const ADD_LIKE = gql`
   mutation addLike($idPublication: ID!) {
      addLike(idPublication: $idPublication)
   }
`;

export const IS_LIKE = gql`
   query isLike($idPublication: ID!) {
      isLike(idPublication: $idPublication)
   }
`;
