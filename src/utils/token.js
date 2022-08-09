// Funciones que se ocupan de manejar toda la informacion del token

import { TOKEN } from "./constans";

// La funcion se realiza porque asi me evito importar constantes 
export function setToken(token) {
     localStorage.setItem(TOKEN, token);
}

export function getToken() {
     return localStorage.getItem(TOKEN);
}