import React, { useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import ImageNoFound from "../../../../assets/png/avatar.png";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../../gql/comment";
import "./Comments.scss";

const Comments = ({ publication }) => {
   const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
      variables: {
         idPublication: publication.id,
      },
   });

   // ! El realtime tiene un impacto sobre el servidor pero con las publicaciones varia
   // ! ya que el realtime solo se va a estar ejecutando cuando el usuario
   // ! tenga una publicacion abierta

   useEffect(() => {
      startPolling(1000);

      return () => {
         stopPolling();
      };
   }, [startPolling, stopPolling]);

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
