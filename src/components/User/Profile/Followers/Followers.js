import React, { useEffect, useState } from "react";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS, GET_FOLLOWEDS } from "../../../../gql/follow";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers";
import "./Followers.scss";

const Followers = (props) => {
   const { username, totalPublications } = props;

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

   const {
      data: dataFolloweds,
      loading: loadingFolloweds,
      startPolling: startPollingFolloweds,
      stopPolling: stopPollingFolloweds,
   } = useQuery(GET_FOLLOWEDS, {
      variables: { username },
   });

   useEffect(() => {
      // Cada cuanto tiempo queremos que haga la consulta a la db
      startPollingFollowers(1000);
      return () => {
         stopPollingFollowers();
      };
   }, [startPollingFollowers, stopPollingFollowers]);

   useEffect(() => {
      startPollingFolloweds(1000);
      return () => {
         stopPollingFolloweds();
      };
   }, [startPollingFolloweds, stopPollingFolloweds]);

   // La siguiente linea de codigo es para garantizar que la peticion ya haya terminado y poder traer la inf correctamente, caso contrario la app se rompe xd!
   if (loadingFollowers || loadingFolloweds) return null;
   const { getFollowers } = dataFollowers; /* arr de usuarios seguidos */
   const { getFolloweds } = dataFolloweds; /* arr usuarios que nos siguen */

   const openFollowers = () => {
      setTitleModal("Seguidores");
      setchildrenModal(
         <ListUsers users={getFollowers} setShowModal={setShowModal} />
      );
      setShowModal(true);
   };

   const openFolloweds = () => {
      setTitleModal("Seguidos");
      setchildrenModal(
         <ListUsers users={getFolloweds} setShowModal={setShowModal} />
      );
      setShowModal(true);
   };

   return (
      <>
         <div className="followers">
            <p>
               <span>{totalPublications}</span> publicaciones
            </p>
            <p className="link" onClick={openFollowers}>
               <span>{size(getFollowers)}</span> seguidores
            </p>
            <p className="link" onClick={openFolloweds}>
               <span>{size(getFolloweds)}</span> seguidos
            </p>
         </div>
         <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
            {childrenModal}
         </ModalBasic>
      </>
   );
};

export default Followers;
