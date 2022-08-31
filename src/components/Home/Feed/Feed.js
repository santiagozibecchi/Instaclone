import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS_FOLLOWEDS } from "../../../gql/publication";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./Feed.scss";

const Feed = () => {
   const { data, loading } = useQuery(GET_PUBLICATIONS_FOLLOWEDS);

   if (loading) return null;
   const { getPublicationsFolloweds } = data;

   return (
      <div className="feed">
         {map(getPublicationsFolloweds, (publication, index) => (
            <div key={index}>
               <p>{publication.file}</p>
            </div>
         ))}
      </div>
   );
};

export default Feed;
