import React from "react";
import { Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_LIKE } from "../../../../gql/like";
import "./Actions.scss";

const Actions = ({ publication }) => {
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

   return (
      <div className="actions">
         <Icon className="like" name="heart" onClick={onAddLike} />
         30 Likes
      </div>
   );
};

export default Actions;
