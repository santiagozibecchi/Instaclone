import { gql } from "@apollo/client";

export const ADD_LIKE = gql`
   mutation addLike($idPublication: ID!) {
      addLike(idPublication: $idPublication)
   }
`;
