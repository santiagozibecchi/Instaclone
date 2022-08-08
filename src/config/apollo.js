import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

// Coneccion del servidor con el cliente

const httpLink = createHttpLink({
     uri: 'http://localhost:4000'
});

const client = new ApolloClient({
     connectToDevTools: true,
     cache: new InMemoryCache,
     link: httpLink,
})

export default client;