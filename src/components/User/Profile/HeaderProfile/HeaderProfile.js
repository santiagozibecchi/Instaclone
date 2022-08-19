import React from "react";
import { Button } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { IS_FOLLOW } from "../../../../gql/follow";
import "./HeaderProfile.scss";

const HeaderProfile = (props) => {
   const { getUser, auth, handlerModal } = props;
   // console.log(auth);

   const { data, loading } = useQuery(IS_FOLLOW, {
      variables: { username: getUser.username },
   });

   console.log(data);

   const buttonFollow = () => {
      if (data.isFollow) {
         return <Button className="btn-danger">Dejar de seguir</Button>;
      } else {
         return <Button className="btn-action">Seguir</Button>;
      }
   };

   return (
      <div className="header-profile">
         <h2>{getUser.username}</h2>
         {auth.username === getUser.username ? (
            <Button onClick={() => handlerModal("settings")}>Ajustes</Button>
         ) : (
            // Si loading es false, significa que ya ha terminado de cargar la peticion
            !loading && buttonFollow()
         )}
      </div>
   );
};

export default HeaderProfile;
