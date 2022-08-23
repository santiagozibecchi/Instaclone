import React from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import ImageNoFound from "../../../../assets/png/avatar.png";
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

   return (
      <div className="comments">
         {map(getComments, (comment, index) => (
            <>
               <Link
                  className="comment"
                  key={index}
                  to={`/${comment.idUser.username}`}
               >
                  <Image src={comment.idUser.avatar || ImageNoFound} avatar />
                  <div>
                     <p>{comment.idUser.username}</p>
                     <p>{comment.comment}</p>
                  </div>
               </Link>
            </>
         ))}
      </div>
   );
};

export default Comments;
