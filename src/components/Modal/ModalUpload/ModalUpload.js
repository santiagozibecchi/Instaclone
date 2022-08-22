import React, { useCallback, useState } from "react";
import { Modal, Icon, Button, Loader, Dimmer } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { PUBLISH } from "../../../gql/publication";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import "./ModalUpload.scss";

const ModalUpload = ({ show, setShow }) => {
   // Estado para mostrar la imagen subida al cliente
   const [fileUpload, setFileUpload] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [publish] = useMutation(PUBLISH);

   // lugar donde llega la img donde el usuario la sube
   const onDrop = useCallback((acceptedFile) => {
      const file = acceptedFile[0];
      setFileUpload({
         type: "image",
         file,
         preview: URL.createObjectURL(file),
      });
   });

   // Para poder subir las imagenes
   const { getRootProps, getInputProps } = useDropzone({
      accept: {
         "image/png": [".png"],
         "image/jpg": [".jpg"],
      },
      noKeyboard: true,
      multiple: false,
      onDrop,
   });

   // Funcion para cerrar el modal
   const onClose = () => {
      setIsLoading(false);
      setFileUpload(null); /* limpiamos el estado*/
      setShow(false);
      // hace que la pagina se recargue
      window.location.reload();
   };

   const onPublish = async () => {
      try {
         setIsLoading(true);
         const result = await publish({
            variables: {
               file: fileUpload.file,
            },
         });

         const { data } = result;

         if (!data.publish.status) {
            toast.warning("Error en la publicacion");
            isLoading(false);
         } else {
            onClose();
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Modal size="tiny" open={show} onClose={onClose} className="modal-upload">
         <div
            {...getRootProps()}
            className="dropzone"
            style={fileUpload && { border: 0 }}
         >
            {!fileUpload && (
               <>
                  <Icon name="cloud upload" />
                  <p>Arrastra tu foto que quieras publicar</p>
               </>
            )}
            <input {...getInputProps()} />
         </div>
         {fileUpload?.type === "image" && (
            <div
               className="image"
               style={{
                  backgroundImage: `url('${fileUpload.preview}')`,
               }}
            />
         )}
         {fileUpload && (
            <Button className="btn-upload btn-action" onClick={onPublish}>
               Publicar
            </Button>
         )}
         {isLoading && (
            <Dimmer active className="publishing">
               <Loader />
               <p>Publicando...</p>
            </Dimmer>
         )}
      </Modal>
   );
};

export default ModalUpload;
