import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './SitioWebForm.scss';

const SitioWebForm = ({ setShowModal, currentWebSite, refetch }) => {

     const [updateUser] = useMutation(UPDATE_USER);

     const formik = useFormik({
          initialValues: {
               siteWeb: currentWebSite || ''
          },
          validationSchema: Yup.object({
               siteWeb: Yup.string().required()
          }),
          onSubmit: async (formData) => {

               console.log(formData);

               try {

                    await updateUser({
                         variables: {
                              input: formData
                         }
                    });

                    refetch();
                    setShowModal(false);

               } catch (error) {
                    console.log(error);
                    toast.error('Error al actualizar la pagina web')
               }

          }
     });

     return (
          <Form className='website-form' onSubmit={formik.handleSubmit}>

               <Form.Input
                    name='siteWeb'
                    value={formik.values.siteWeb}
                    onChange={formik.handleChange}
                    error={formik.errors.siteWeb && true}
               />

               <Button type='submit' className='btn-submit'>
                    Actualizar
               </Button>

          </Form>
     );
};

export default SitioWebForm;