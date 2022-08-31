import React, { useState } from "react";
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
   const [loadingAction, setLoadingAction] = useState(false);

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
      setLoadingAction(true);
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
      setLoadingAction(false);
   };

   const onDeleteLike = async () => {
      setLoadingAction(true);
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
      setLoadingAction(false);
   };

   const onAction = () => {
      if (!loadingAction) {
         if (isLike) {
            onDeleteLike();
         } else {
            onAddLike();
         }
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
            onClick={onAction}
         />
         {countLikes} {countLikes === 1 ? "like" : "likes"}
      </div>
   );
};

// !  Evitando que un usuario de varios likes seguidos
// * Puede pasar que si un usuario da varios likes de seguido se pueda
// * lanzar mas de una peticion a la vez, ocacionando que se agrege
// * mas de un like

// Solucion al problema:
// Se creara un loading invisible para comprabar que cuando el usuario
// pinche en el corazon va a estar cargando y cuando acabe la peticion
// de dar like, se quitara el loading invisible.
// Conclusion: mientras ente cargando la funcion para clickear el corazon
// no va a funcionar

export default Actions;
