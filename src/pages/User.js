import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATION } from "../gql/publication";
import { size } from "lodash";
import Profile from "../components/User/Profile";
import Publications from "../components/Publications";

// A esta pagina de user, lo vamos a dividir en dos componentes
// Componente Profile donde se va a encontrar todos los datos del usuario=> Persona que seguimos, que nos siguen, etc

// Componente Publication que sera una lista de todas las publicaciones que hemos hecho -> las imagenes, etc

const User = () => {
   const { username } = useParams();

   const { data, loading } = useQuery(GET_PUBLICATION, {
      variables: { username },
   });

   if (loading) return null;
   const { getPublications } = data;

   return (
      <>
         <Profile
            username={username}
            totalPublications={size(getPublications)}
         />
         <Publications getPublications={getPublications} />
      </>
   );
};

export default User;
