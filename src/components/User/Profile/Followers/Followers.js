import React, { useEffect, useState } from "react";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../../../gql/follow";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers";
import "./Followers.scss";

const Followers = (props) => {
   const { username } = props;

   const [showModal, setShowModal] = useState(false);
   const [titleModal, setTitleModal] = useState("");
   const [childrenModal, setchildrenModal] = useState(null);

   const {
      data: dataFollowers,
      loading: loadingFollowers,
      startPolling: startPollingFollowers,
      stopPolling: stopPollingFollowers,
   } = useQuery(GET_FOLLOWERS, {
      variables: { username },
   });

   useEffect(() => {
      // Cada cuanto tiempo queremos que haga la consulta a la db
      startPollingFollowers(1000);
      return () => {
         stopPollingFollowers();
      };
   }, [startPollingFollowers, stopPollingFollowers]);

   // La siguiente linea de codigo es para garantizar que la peticion ya haya terminado y poder traer la inf correctamente, caso contrario la app se rompe xd!
   if (loadingFollowers) return null;
   const { getFollowers } = dataFollowers; /* array de usuarios seguidos */

   const openFollowers = () => {
      setTitleModal("seguidores");
      setchildrenModal(
         <ListUsers users={getFollowers} setShowModal={setShowModal} />
      );
      setShowModal(true);
   };

   return (
      <>
         <div className="followers">
            <p>
               <span>**</span> publicaciones
            </p>
            <p className="link" onClick={openFollowers}>
               <span>{size(getFollowers)}</span> seguidores
            </p>
            <p className="link">
               <span>**</span> seguidos
            </p>
         </div>
         <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
            {childrenModal}
         </ModalBasic>
      </>
   );
};

export default Followers;
