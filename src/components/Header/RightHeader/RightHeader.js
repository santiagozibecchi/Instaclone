import React, { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
import ImageneNotFound from "../../../assets/png/avatar.png";
import ModalUpload from "../../Modal/ModalUpload";
import "./RightHeader.scss";

const RightHeader = () => {
   const [showModal, setShowModal] = useState(false);

   // para traer la informacion del usuario
   const { auth } = useAuth();

   const { data, loading, error } = useQuery(GET_USER, {
      variables: { username: auth.username },
   });

   if (loading || error) return null;
   const { getUser } =
      data; /* data es todo el objeto que contiene la data del usuario */

   return (
      <>
         <div className="right-header">
            <Link to="/">
               <Icon name="home" />
            </Link>

            <Icon name="plus" onClick={() => setShowModal(true)}/>

            <Link to={`/${auth.username}`}>
               <Image
                  src={getUser.avatar ? getUser.avatar : ImageneNotFound}
                  avatar
               />
            </Link>
         </div>
         <ModalUpload show={showModal} setShow={setShowModal} />
      </>
   );
};

export default RightHeader;
