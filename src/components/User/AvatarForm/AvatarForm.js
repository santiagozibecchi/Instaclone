import React, { useCallback, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR } from '../../../gql/user';
import { toast } from 'react-toastify';
import './AvatarForm.scss';

const AvatarForm = ({ setShowModal }) => {

     // Estado para saber si se esta cargando la imagen o no
     const [loading, setLoading] = useState(false);

     const [updateAvatar] = useMutation(UPDATE_AVATAR);

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
               console.log(result); /*  => {data: {…}} */

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