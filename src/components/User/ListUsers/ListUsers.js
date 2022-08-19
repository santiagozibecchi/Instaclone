import React from "react";
import { size, map } from "lodash";
import { Image } from "semantic-ui-react";
import ImageNoFound from "../../../assets/png/avatar.png";
import { useHistory } from "react-router-dom";
import "./ListUsers.scss";

const ListUsers = ({ users, setShowModal }) => {
   const history = useHistory();

   const goToUser = (username) => {
      setShowModal(false);
      history.push(`/${username}`);
   };

   return (
      <div className="list-users">
         {size(users) === 0 ? (
            <p className="list-users__not-users">
               No se han encontrado usuarios
            </p>
         ) : (
            map(users, (user, index) => (
               <div key={index} className="list-users__user">
                  <Image src={user.avatar || ImageNoFound} avatar />
                  <div onClick={() => goToUser(user.username)}>
                     <p>{user.name}</p>
                     <p>{user.username}</p>
                  </div>
               </div>
            ))
         )}
      </div>
   );
};

export default ListUsers;

// Primero es necesario comprobar si el usuario tiene seguidores, si no => mostrar text
