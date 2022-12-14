import React, { useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client"; /* Para hacer el get de los usuarios */
import { GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
import ImageNoFound from "../../../assets/png/avatar.png";
import UserNotFound from "../../UserNotFound";
import ModalBasic from "../../Modal/ModalBasic";
import AvatarForm from "../AvatarForm";
import HeaderProfile from "./HeaderProfile";
import SettingsForm from "../SettingsForm/SettingsForm";
import Followers from "./Followers";
import "./Profile.scss";

const Profile = (props) => {
   const { username, totalPublications } = props;

   // Hay que comprobar si el usuario logeado esta viendo su perfil o esta viendo otro !!!
   // Para obtener los datos del usuario logeado
   const { auth } = useAuth();

   const [showModal, setShowModal] = useState(false);
   const [titleModal, setTitleModal] = useState("");
   const [childrenModal, setChildrenModal] = useState(null);

   const { data, loading, error, refetch } = useQuery(GET_USER, {
      variables: { username },
   });
   // result -> Cuando se monta el componente por primera vez data => undefined
   // porque todavia se esta resolviendo la peticion

   if (loading)
      return null; /* con esto controlamos en renderizado del componente... Si esta cargado no hace nada */
   if (error) return <UserNotFound />;

   const { getUser } = data;

   // console.log(data)
   // console.log(getUser);

   // FUNCION PARA HACER EL MODAL DINAMICO
   // Se necesitaran 3 estados => Titulo del avatar - children del modal - setearModal

   const handlerModal = (typeOfModal) => {
      switch (typeOfModal) {
         case "avatar":
            setTitleModal("Cambiar foto de perfil");
            setChildrenModal(
               <AvatarForm setShowModal={setShowModal} auth={auth} />
            );
            setShowModal(true);
            break;
         case "settings":
            setTitleModal("");
            setChildrenModal(
               <SettingsForm
                  setShowModal={setShowModal}
                  setTitleModal={setTitleModal}
                  setChildrenModal={setChildrenModal}
                  getUser={getUser}
                  refetch={refetch}
               />
            );
            setShowModal(true);
            break;

         default:
            break;
      }
   };

   return (
      <>
         <Grid className="profile">
            <Grid.Column width={5} className="profile__left">
               <Image
                  src={getUser.avatar ? getUser.avatar : ImageNoFound}
                  avatar
                  onClick={() =>
                     username === auth.username && handlerModal("avatar")
                  }
               />
            </Grid.Column>

            <Grid.Column width={11} className="profile__right">
               <HeaderProfile
                  handlerModal={handlerModal}
                  getUser={getUser}
                  auth={auth}
               />{" "}
               {/* Informacion del usuario */}
               <Followers
                  username={username}
                  totalPublications={totalPublications}
               />
               <div className="other">
                  <p className="name">{getUser.name}</p>
                  {getUser.siteWeb && (
                     <a
                        href={getUser.siteWeb}
                        className="site-web"
                        target="_blank"
                     >
                        {getUser.siteWeb}
                     </a>
                  )}
                  {getUser.description && (
                     <p className="description">{getUser.description}</p>
                  )}
               </div>
            </Grid.Column>
         </Grid>

         <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
            {childrenModal}
         </ModalBasic>
      </>
   );
};

export default Profile;
