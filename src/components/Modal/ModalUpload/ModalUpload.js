import React, { useCallback, useState } from "react";
import { Modal, Icon, Button, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./ModalUpload.scss";

const ModalUpload = ({ show, setShow }) => {
   // Estado para mostrar la imagen subida al cliente
   const [fileUpload, setFileUpload] = useState(null);

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
      setShow(false);
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
      </Modal>
   );
};

export default ModalUpload;
