import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client'
import useAuth from '../../../hooks/useAuth';
import './SettingsForm.scss';
import PasswordForm from '../PasswordForm';

const SettingsForm = ({ setShowModal, setTitleModal, setChildrenModal }) => {

     const history = useHistory();
     const client = useApolloClient();
     const { logout } = useAuth();

     // Funcion para actualizar el modal y mostrar el nuevo comp. para cambiar password
     const onChangePassword = () => {
          setTitleModal('Cambiar tu contraseña'); /* Titulo del modal */
          setChildrenModal( /* Hijo, todas las opciones del modal */
               < PasswordForm />
          )
     }

     const onLogout = () => {
          client.clearStore();
          logout();
          history.push('/');
     }

     return (
          <div className='settings-form'>

               <Button onClick={onChangePassword}>Cambiar Contraseña</Button>
               <Button >Cambiar Email</Button>
               <Button >Cambiar Descripción</Button>
               <Button >Sitio Web</Button>
               <Button onClick={onLogout}>Cerrar Sesion</Button>
               <Button onClick={() => setShowModal(false)}>Cancelar</Button>

          </div>
     )
}

export default SettingsForm