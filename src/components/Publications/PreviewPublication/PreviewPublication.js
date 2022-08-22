import React from "react";
import { Image } from "semantic-ui-react";
import "./PreviewPublication.scss";

const PreviewPublication = ({ publication }) => {
   return (
      <>
         <div className="preview-publication">
            <Image
               className="preview-publication__image"
               src={publication.file}
            />
         </div>
      </>
   );
};

export default PreviewPublication;
