import { ApolloClient, /* createHttpLink */InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { getToken } from '../utils/token';

// Codigo anterior .....
// const httpLink = createHttpLink({
//      uri: 'http://localhost:4000'
// });

// Nueva coneccion para aws
const httpLink = createUploadLink({
     uri: 'http://localhost:4000/graphql'
});

// Coneccion del servidor con el cliente
const authLink = setContext((_, { headers }) => {
     const token = getToken();

     return {
          headers: {
               ...headers, /* Para obtener todos los datos  */
               Authorization: token ? `Bearer ${token}` : '',
          },
     };
});

// En cada peticion que se haga en la aplicacion si estamos logeado se mandara
// el token y sino, no se mandara
const client = new ApolloClient({
     connectToDevTools: true,
     cache: new InMemoryCache(),
     link: authLink.concat(httpLink),
});


export default client;