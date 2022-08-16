import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';
import './EmailForm.scss';

const EmailForm = (props) => {

     const { currentEmail, setShowModal, refetch } = props;

     const [updateUser] = useMutation(UPDATE_USER);

     const formik = useFormik({
          initialValues: {
               email: currentEmail || ""
          },
          validationSchema: Yup.object({
               email: Yup.string().email().required(),
          }),
          onSubmit: async (formData) => {

               try {

                    // formData ya es un obj con clave: valor => email del name y el valor ingresado por el usuario que corresponde al email
                    await updateUser({
                         variables: {
                              input: formData
                         }
                    })

                    refetch();
                    setShowModal(false);

               } catch (error) {
                    console.log(error);
                    toast.error('Error al actualizar el email')
               }

          }
     })

     return (
          <Form className='email-form' onSubmit={formik.handleSubmit}>

               <Form.Input
                    placeholder='Ingrese el nuevo email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email && true}
               />

               <Button className='btn-submit' type='submit'>Actualizar</Button>

          </Form>

     );
};

export default EmailForm