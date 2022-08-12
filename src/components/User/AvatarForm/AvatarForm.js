import React, { useCallback, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR, GET_USER } from '../../../gql/user';
import { toast } from 'react-toastify';
import './AvatarForm.scss';

const AvatarForm = ({ setShowModal, auth }) => {

     // Estado para saber si se esta cargando la imagen o no
     const [loading, setLoading] = useState(false);

     // useMutatio recibe un segundo parametro que es un objeto
     const [updateAvatar] = useMutation(UPDATE_AVATAR, {
          // Recogemos cache y la actualizamos
          // TODO AÑADIMOS LA VARIABLE UPDATE A LA PETICION
          update(cache, { data: { updateAvatar } }) { /* datos que nos devuelve el servidor en la peticion*/
               // Peticion a la cache y extraccion de la query
               // console.log(updateAvatar)
               // TODO OBTENEMOS LOS DATOS QUE TENEMOS ALMACENADO EN LA CACHE
               const { getUser } = cache.readQuery({
                    query: GET_USER, /* La query queremos leer es la que nos devuelve los datos del usuario */
                    variables: { username: auth.username }
               });

               // Reescribir
               // TODO QUE QUERY QUEREMOS ACTUALIZAR
               cache.writeQuery({
                    // Peticion de la cache que queremos reescribir
                    query: GET_USER,
                    variables: { username: auth.username },
                    // Nuevos datos de la query
                    // TODO MANDAMOS LOS NUEVOS DATOS
                    data: {
                         getUser: { ...getUser, avatar: updateAvatar.urlAvatar } /* Obtenemos los datos internos del objeto y se lo pasamos */
                    }
               });
          },
     });

     const onDrop = useCallback(async (acceptedFile) => {
          const file = acceptedFile[0];

          // Peticion al servidor
          try {
               setLoading(true);
               // console.log(file);
               const result = await updateAvatar({
                    variables: { file }
               })
               const { data } = result;
               console.log(result); /*  => {data: {…}} -> status y url */

               if (!data.updateAvatar.status) {
                    toast.warning('Error al actualizar el avatar');
                    setLoading(false);
               } else {
                    // Imagen subida correctamente
                    setLoading(false);
                    setShowModal(false);
               }

          } catch (error) {
               console.log(error);
          }


     }, []);

     const { getRootProps, getInputProps } = useDropzone({
          accept: {
               'image/jpg': ['.jpg'],
               'image/png': ['.png'],
          },
          noKeyboard: true,
          multiple: false,
          onDrop
     });

     return (
          <div className='avatar-form'>
               <Button {...getRootProps()} loading={loading}>Cargar una foto</Button>
               <Button>Eliminar foto actual</Button>
               <Button onClick={() => setShowModal(false)}>Cancelar</Button>
               <input {...getInputProps()} />
          </div>
     )
}

export default AvatarForm