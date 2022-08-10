
// LAYOUTS
import LayoutBasic from '../layouts/LayoutBasic';


// PAGES QUE SE VAN A APLICAR EN EL SISTEMA DE RUTAS
// El sistema de rutas es para usuarios logeados
import Home from '../pages/Home';
import User from '../pages/User';
import Error404 from '../pages/Error404';

// Arr de objetos para crear la conf de nuestro sistema de nav

const routes = [
     {
          path: '/',
          layout: LayoutBasic,
          component: Home,
          exact: true
     },
     {
          path: '/:username', /* {username: nombreUsuario} - useParams() */
          layout: LayoutBasic,
          component: User,
          exact: true
     },
     {
          layout: LayoutBasic,
          component: Error404
     },
];

export default routes;
