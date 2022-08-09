import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Devuelve el valor que tiene nuestro contexto
export default () => useContext(AuthContext);