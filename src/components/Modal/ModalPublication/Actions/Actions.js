import React from "react";
import { Icon } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import {
   ADD_LIKE,
   IS_LIKE,
   DELETE_LIKE,
   COUNT_LIKES,
} from "../../../../gql/like";
import "./Actions.scss";

const Actions = ({ publication }) => {
   const { data, loading, refetch } = useQuery(IS_LIKE, {
      variables: {
         idPublication: publication.id,
      },
   });

   const {
      data: dataCount,
      loading: loadingCount,
      refetch: refetchCount,
   } = useQuery(COUNT_LIKES, {
      variables: {
         idPublication: publication.id,
      },
   });

   const [addLike] = useMutation(ADD_LIKE);
   const [deleteLike] = useMutation(DELETE_LIKE);

   const onAddLike = async () => {
      try {
         await addLike({
            variables: {
               idPublication: publication.id,
            },
         });
         refetch();
         refetchCount();
      } catch (error) {
         console.log(error);
      }
   };

   const onDeleteLike = async () => {
      try {
         await deleteLike({
            variables: {
               idPublication: publication.id,
            },
         });
         refetch();
         refetchCount();
      } catch (error) {
         console.log(error);
      }
   };

   // Para que espere el resultado antes de esperar el corazon
   // En otras palabras, primero comprueba si ha dado like y despues muestrame el corazon
   if (loading || loadingCount) return null;

   const { isLike } = data;
   const { countLikes } = dataCount;

   return (
      <div className="actions">
         <Icon
            className={isLike ? "like active" : "like"}
            name={isLike ? "heart" : "heart outline"}
            onClick={isLike ? onDeleteLike : onAddLike}
         />
         {countLikes} {countLikes === 1 ? "like" : "likes"}
      </div>
   );
};

export default Actions;
