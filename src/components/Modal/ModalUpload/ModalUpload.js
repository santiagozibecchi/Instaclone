import React, { useCallback } from "react";
import { Modal, Icon, Button, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./ModalUpload.scss";

const ModalUpload = ({ show, setShow }) => {
   // lugar donde llega la img donde el usuario la sube
   const onDrop = useCallback((acceptedFile) => {

      const file = acceptedFile[0]
      console.log(file);
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
      <Modal
         size="small"
         open={show}
         onClose={onClose}
         className="modal-upload"
      >
         <div {...getRootProps()} className="dropzone">
            <Icon name="cloud upload" />
            <p>Arrastra tu foto que quieras publicar</p>
            <input {...getInputProps()} />
         </div>
      </Modal>
   );
};

export default ModalUpload;
