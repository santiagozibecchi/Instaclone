import React from "react";
import { Icon } from "semantic-ui-react";
import "./Actions.scss";

const Actions = ({ publication }) => {
   return (
      <div className="actions">
         <Icon
            className="like"
            name="heart"
            onClick={() => console.log("like")}
         />
         30 Likes
      </div>
   );
};

export default Actions;
