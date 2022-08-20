import React from "react";
import { Modal, Icon, Button, Loader } from "semantic-ui-react";
import "./ModalUpload.scss";

const ModalUpload = ({ show, setShow }) => {
   // Funcion para cerrar el modal
   const onClose = () => {
      setShow(false);
   };

   return (
      <Modal size="small" open={show} onClose={onClose} className="modal-upload">
         <h1>Esto es el modal upload</h1>
      </Modal>
   );
};

export default ModalUpload;
