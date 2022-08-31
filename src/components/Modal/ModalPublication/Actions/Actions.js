import React from "react";
import { Icon } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_LIKE, IS_LIKE } from "../../../../gql/like";
import "./Actions.scss";

const Actions = ({ publication }) => {
   const { data, loading } = useQuery(IS_LIKE, {
      variables: {
         idPublication: publication.id,
      },
   });

   const [addLike] = useMutation(ADD_LIKE);

   const onAddLike = async () => {
      try {
         await addLike({
            variables: {
               idPublication: publication.id,
            },
         });
      } catch (error) {
         console.log(error);
      }
   };

   const onDeleteLike = async () => {
      console.log("eleminar like");
   };

   // Para que espere el resultado antes de esperar el corazon
   // En otras palabras, primero comprueba si ha dado like y despues muestrame el corazon
   if (loading) return null;

   const { isLike } = data;

   return (
      <div className="actions">
         <Icon
            className={isLike ? "like active" : "like"}
            name={isLike ? "heart" : "heart outline"}
            onClick={isLike ? onDeleteLike : onAddLike}
         />
         30 Likes
      </div>
   );
};

export default Actions;
