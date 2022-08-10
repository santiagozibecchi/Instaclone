import React, { useEffect, useState, useMemo } from "react";
import client from "./config/apollo";
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import Auth from './pages/Auth';
import { getToken, decodeToken } from "./utils/token";
import AuthContext from "./context/AuthContext";
import Navigation from "./routes/Navigation";

// Crearemos un Context API para poder actualizar el estado setAuth sin tener 
// que recargar toda la app

export default function App() {

     // Usuario logeado o no logeado
     const [auth, setAuth] = useState(undefined);


     // Cuando se monte el app.js -> que es el punto de partida de nuestra aplicacion
     // Recuperamos el token en este punto
     // Para actualizar el estado una sola vez
     useEffect(() => {
          // Porque dentro de un useEffect?
          // para que no genere un bucle infinito 
          const token = getToken();

          if (!token) { /* Si no viene el token es null (true) */
               setAuth(null);
          } else { /* Si token tiene valor */
               setAuth(decodeToken(token));
          }
     }, []);

     // CONTEXT API INFORMATION DATA

     // Funcion para deslogear el usuario desde cualquier parte de la app.
     const logout = () => {
          console.log('cerrar sesion');
     };

     // Actualiza el usuario logeado
     const setUser = (user) => {
          console.log(user);
          setAuth(user);
     };

     // Si por cualquier valor se vuelve a renderizar esta constante y viene los mismos datos
     // useMemo -> campara los datos anteriores con los nuevos y si hay cualquier cambio 
     // lo actualiza pero si llegan excantemente los mismos cambios, no hace absolutamente
     // nada y evitamos  que el componente se vuelva a recargar.
     const authData = useMemo(
          () => ({
               auth,
               logout,
               setUser
          }), [auth]
     );

     return (

          <ApolloProvider client={client}>
               <AuthContext.Provider value={authData}>

                    {!auth ? <Auth /> : <Navigation />}

                    <ToastContainer
                         position="top-right"
                         autoClose={5000}
                         hideProgressBar
                         newestOnTop
                         closeOnClick
                         rtl={false}
                         pauseOnFocusLoss
                         draggable
                         pauseOnHover
                    />

               </AuthContext.Provider>
          </ApolloProvider>
     );
}
