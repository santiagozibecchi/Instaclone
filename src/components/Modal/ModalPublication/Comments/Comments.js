import React from "react";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../../gql/comment";
import "./Comments.scss";

const Comments = ({ publication }) => {
   const { data, loading } = useQuery(GET_COMMENTS, {
      variables: {
         idPublication: publication.id,
      },
   });

   if (loading) return null;

   const { getComments } = data;
   console.log(getComments)
   return (
      <div>
         <h3>Comments</h3>
      </div>
   );
};

export default Comments;
