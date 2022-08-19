import React from "react";
import { size, map } from "lodash";
import "./ListUsers.scss";

const ListUsers = ({ users, setShowModal }) => {
   return (
      <div className="list-users">
         {size(users) === 0 ? (
            <p className="list-users__not-users">
               No se han encontrado usuarios
            </p>
         ) : (
            map(users, (user, index) => (
               <div key={index}>
                  <h2>{user.name}</h2>
               </div>
            ))
         )}
      </div>
   );
};

export default ListUsers;

// Primero es necesario comprobar si el usuario tiene seguidores, si no => mostrar text
