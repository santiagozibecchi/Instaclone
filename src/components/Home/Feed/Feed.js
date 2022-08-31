import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS_FOLLOWEDS } from "../../../gql/publication";
import Action from "../../Modal/ModalPublication/Actions";
import ImageNotFound from "../../../assets/png/avatar.png";
import CommentForm from "../../Modal/ModalPublication/CommentForm";
import "./Feed.scss";

const Feed = () => {
   const { data, loading } = useQuery(GET_PUBLICATIONS_FOLLOWEDS);

   if (loading) return null;
   const { getPublicationsFolloweds } = data;
   console.log(getPublicationsFolloweds);

   return (
      <div className="feed">
         {map(getPublicationsFolloweds, (publication, index) => (
            <div key={index} className="feed__box">
               <Link to={`/${publication.idUser.username}`}>
                  <div className="feed__box-user">
                     <Image
                        src={publication.idUser.avatar || ImageNotFound}
                        avatar
                     />
                     <span>{publication.idUser.name}</span>
                  </div>
               </Link>
               <div
                  className="feed__box-photo"
                  style={{ backgroundImage: `url(${publication.file})` }}
               />
               <div className="feed__box-actions">
                  <Action publication={publication} />
               </div>
               <div className="feed__box-form">
                  <CommentForm publication={publication} />
               </div>
            </div>
         ))}
      </div>
   );
};

export default Feed;
