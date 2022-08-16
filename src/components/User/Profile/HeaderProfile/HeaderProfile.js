import React from 'react';
import { Button } from 'semantic-ui-react';
import './HeaderProfile.scss';

const HeaderProfile = (props) => {

     const { getUser, auth, handlerModal } = props;

     // console.log(auth);

     return (
          <div className='header-profile'>
               <h2>{getUser.username}</h2>
               {
                    auth.username === getUser.username
                         ? <Button onClick={() => handlerModal('settings')}>Ajustes</Button>
                         : <Button>Seguir</Button>
               }
          </div>
     )
}

export default HeaderProfile