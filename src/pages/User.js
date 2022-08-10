import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../components/Profile';

// A esta pagina de user, lo vamos a dividir en dos componentes 
// Componente Profile donde se va a encontrar todos los datos del usuario=> Persona que seguimos, que nos siguen, etc

// Componente Publication que sera una lista de todas las publicaciones que hemos hecho -> las imagenes, etc


const User = () => {

     const { username } = useParams();

     return (
          <>
               <Profile username={username} />
          </>
     )
}

export default User