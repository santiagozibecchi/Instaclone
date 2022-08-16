import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import * as  Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';
import './PasswordForm.scss';

const PasswordForm = (props) => {

     const { logout } = props;

     const [updateUser] = useMutation(UPDATE_USER);

     const formik = useFormik({
          initialValues: initialValues(),
          validationSchema: Yup.object({
               currentPassword: Yup.string().required(),
               newPassword: Yup.string()
                    .required()
                    .oneOf([Yup.ref('repeatPassword')]), /* newPassword tiene que ser exactamente igual que newPassword para pasar la validacion */
               repeatPassword: Yup.string()
                    .required()
                    .oneOf([Yup.ref('newPassword')])
          }),
          onSubmit: async (formValues) => {

               try {

                    const result = await updateUser({
                         // Idem datos que mandamos desde el apolloStudio
                         variables: {
                              input: {
                                   currentPassword: formValues.currentPassword,
                                   newPassword: formValues.newPassword,
                              }
                         }
                    })

                    if (!result.data.updateUser) {
                         toast.error('Error al cambiar la contraseña')
                    } else {
                         // console.log('Password cambiada');
                         logout();
                    }

               } catch (error) {
                    toast.error('Error al cambiar la contraseña')
               }
          }
     });

     return (
          <Form className='password-form' onSubmit={formik.handleSubmit}>

               <Form.Input
                    type='password'
                    placeholder='Contraseña actual'
                    name='currentPassword'
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.currentPassword && true}
               />
               <Form.Input
                    type='password'
                    placeholder='nueva contraseña'
                    name='newPassword'
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.newPassword && true}
               />
               <Form.Input
                    type='password'
                    placeholder='repitir la nueva contraseña'
                    name='repeatPassword'
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.repeatPassword && true}
               />

               <Button type='submit' className='btn-submit'>Actualizar</Button>

          </Form>
     )
};

const initialValues = () => {
     return {
          currentPassword: '',
          newPassword: '',
          repeatPassword: ''
     }
}

export default PasswordForm;