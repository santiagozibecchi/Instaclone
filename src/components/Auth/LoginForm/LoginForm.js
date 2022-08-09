import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../../gql/user';
import { setToken, decodeToken } from '../../../utils/token';
import './LoginForm.scss';
import useAuth from '../../../hooks/useAuth';

const LoginForm = () => {

     const [error, setError] = useState('');
     const [login] = useMutation(LOGIN);

     // Cuando el usuario genera un login correctamente -> Actualiza el estado 
     // Al hacerlo, el componente lo que hace es repintar nuestra aplicacion y 
     // obtiene los nuevos datos del estado y lo manda al estado de logeado
     const { setUser } = useAuth();

     const formik = useFormik({
          initialValues: initialValues(),
          validationSchema: Yup.object({
               email: Yup.string()
                    .email('El email no es valido')
                    .required('El email es obligatorio'),
               password: Yup.string()
                    .required('La contraseña es obligatoria')
          }),
          onSubmit: async (formData) => {

               // En formData viene el objeto data de la base de datos

               // Hasta que no acaba la ejecucion que hemos ejecutado el estado no
               // se va a ejecutar 
               // setError() va a modifiicar el estado una unica vez
               try {

                    setError('');

                    // en login viene el token
                    const { data } = await login({
                         variables: {
                              input: formData
                         }
                    });

                    // token generado desde la base de datos
                    const { login: { token } } = data;
                    console.log(token);
                    // Ejecutamos la funcion para guardar el token en el navegador
                    setToken(token);
                    // Le pasamos al estado global de la app, el token decodificado.
                    setUser(decodeToken(token));

               } catch (error) {
                    setError(error.message)
                    console.log(error);
                    console.log(error.message)
               }

          }
     });


     return (

          <Form className='login-form' onSubmit={formik.handleSubmit}>

               <h2>Entra para ver fotos y videos de tus amigos</h2>

               <Form.Input
                    type='text'
                    placeholder='Correo electronico'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email && true}
               />

               <Form.Input
                    type='password'
                    placeholder='Contraseña'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password && true}

               />

               <Button type='submit' className='btn-submit'>Iniciar Sesion</Button>

               {error &&
                    <p className='submit-error'>{error}</p>
               }

          </Form>
     )
}

const initialValues = () => {
     return {
          email: '',
          password: ''
     }
}

export default LoginForm