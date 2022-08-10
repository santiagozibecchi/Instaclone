import React from "react";
import {
     BrowserRouter as Router,
     Switch,
     Route,
     Link
} from "react-router-dom";
import routes from "./routes";
import { map } from 'lodash';

const Navigation = () => {
     return (
          <Router>
               <Switch>

                    {    /* Por cada iteracion nos devuelve la ruta y el index de la ruta */
                         map(routes, (route, index) => (
                              <Route
                                   key={index}
                                   path={route.path}
                                   exact={route.exact}
                                   render={(props) => (
                                        <route.layout>
                                             <route.component {...props} />
                                        </route.layout>
                                   )}
                              />
                         ))
                    }

               </Switch>
          </Router>
     )
}

export default Navigation;


