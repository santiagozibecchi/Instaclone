import React from 'react';
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../../gql/user';

import './RegisterForm.scss';

const RegisterForm = (props) => {

     const { setShowLogin } = props;
     const [register] = useMutation(REGISTER);

     const formik = useFormik({
          initialValues: initialValues(),
          validationSchema: Yup.object({
               name: Yup.string().required('Ingrese su nombre por favor'),
               username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, 'El nombre de usuario no puede tener espacio').required('El nombre de usuario es obligatorio'),
               email: Yup.string().email('El email no es valido').required('El correo es obligatorio'),
               password: Yup.string()
                    .required('La contraseña es obligatoria')
                    .oneOf([Yup.ref('repeatPassword')], 'Las contraseñas no coinciden'),
               repeatPassword: Yup.string()
                    .required('La contraseña es obligatoria')
                    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
          }),
          onSubmit: async (formData) => {

               try {
                    // se utiliza una nueva variable porque no es recomendable modificar nunca los datos que nos llevan directamente
                    const newUser = formData;
                    // Eliminamos la password de verificacion para no mandar a la DB
                    delete newUser.repeatPassword;

                    const result = await register({
                         variables: {
                              input: newUser /* newUser ya es un objeto */
                         }
                    });

                    toast.success('Usuario creado correctamente');

                    setShowLogin(true);

               } catch (error) {
                    toast.error(error.message)
                    console.log(error);
               }
          }
     });

     return (
          <>
               <h2 className='register-form-title'>Registrate para ver fotos y videos de tus amigos</h2>
               <Form className='register-form' onSubmit={formik.handleSubmit}>
                    <Form.Input
                         type='text'
                         placeholder='Nombre y apellido'
                         name='name'
                         value={formik.values.name}
                         onChange={formik.handleChange}
                         error={formik.errors.name && true}
                    />
                    <Form.Input
                         type='text'
                         placeholder='Nombre se usuario'
                         name='username'
                         value={formik.values.username}
                         onChange={formik.handleChange}
                         error={formik.errors.username && true}
                    />
                    <Form.Input
                         type='text'
                         placeholder='correo electronico'
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
                         error={formik.errors.password}
                    />
                    <Form.Input
                         type='password'
                         placeholder='Repetir contraseña'
                         name='repeatPassword'
                         value={formik.values.repeatPassword}
                         onChange={formik.handleChange}
                         error={formik.errors.repeatPassword}
                    />
                    <Button type='submit' className='btn-submit'>Registrarse</Button>

                    {/* <Button type='button' onClick={formik.handleReset}>Reinicial formulario</Button> */}

               </Form>
          </>
     )
}

const initialValues = () => {
     return {
          name: '',
          username: '',
          email: '',
          password: '',
          repeatPassword: ''
     }
}

export default RegisterForm