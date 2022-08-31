import React from "react";
import { Imagen } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_NOT_FOLLOWEDS } from "../../../gql/follow";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./UsersNotFolloweds.scss";

const UsersNotFolloweds = () => {
   const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);

   if (loading) return null;
   const { getNotFolloweds } = data;
   console.log(getNotFolloweds);

   return (
      <div>
         <h2>UsersNotFolloweds</h2>
      </div>
   );
};

export default UsersNotFolloweds;
