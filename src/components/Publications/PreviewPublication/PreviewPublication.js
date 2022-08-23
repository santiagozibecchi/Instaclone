import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import ModalPublication from "../../Modal/ModalPublication";
import "./PreviewPublication.scss";

const PreviewPublication = ({ publication }) => {
   const [showModal, setShowModal] = useState(false);

   return (
      <>
         <div
            className="preview-publication"
            onClick={() => setShowModal(true)}
         >
            <Image
               className="preview-publication__image"
               src={publication.file}
            />
         </div>
         {showModal && (
            <ModalPublication
               publication={publication}
               show={showModal}
               setShow={setShowModal}
            />
         )}
      </>
   );
};

export default PreviewPublication;
