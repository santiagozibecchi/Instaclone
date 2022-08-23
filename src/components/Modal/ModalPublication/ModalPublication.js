import React from "react";
import { Modal, Grid } from "semantic-ui-react";
import "./ModalPublication.scss";

const ModalPublication = ({ publication, show, setShow }) => {
   const onClose = () => {
      setShow(false);
   };

   return (
      <Modal open={show} onClose={onClose} className="modal-publication">
         <Grid>
            <Grid.Column
               className="modal-publication__left"
               width={10}
               style={{
                  backgroundImage: `url("${publication.file}")`,
               }}
            />
            <Grid.Column className="modal-publication__right" width={6}>
               <h3>COMENTARIOS</h3>
            </Grid.Column>
         </Grid>
      </Modal>
   );
};

export default ModalPublication;
