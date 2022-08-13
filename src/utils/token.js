// Funciones que se ocupan de manejar toda la informacion del token

import jwtDecode from "jwt-decode";
import { TOKEN } from "./constans";

// La funcion se realiza porque asi me evito importar constantes 
export function setToken(token) {
     localStorage.setItem(TOKEN, token);
}

export function getToken() {
     return localStorage.getItem(TOKEN);
}

export function decodeToken(token) {
     return jwtDecode(token);
}

export function removeToken() {
     localStorage.removeItem(TOKEN);
}