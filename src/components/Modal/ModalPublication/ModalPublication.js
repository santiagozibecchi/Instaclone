import React from "react";
import { Modal, Grid } from "semantic-ui-react";
import "./ModalPublication.scss";

const ModalPublication = ({ publication, show, setShow }) => {
   console.log(publication);

   const onClose = () => {
      setShow(false);
   };

   return (
      <Modal open={show} onClose={onClose} className="moda-publication">
         <Grid>
            <Grid.Column className="modal-publication__left" width={10}>
               <h3>IMAGEN</h3>
            </Grid.Column>
            <Grid.Column className="modal-publication__right" width={6}>
               <h3>COMENTARIOS</h3>
            </Grid.Column>
         </Grid>
      </Modal>
   );
};

export default ModalPublication;
