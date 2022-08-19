import React from "react";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../../../gql/follow";
import "./Followers.scss";

const Followers = (props) => {
   const { username } = props;

   const { data: dataFollowers, loading: loadingFollowers } = useQuery(
      GET_FOLLOWERS,
      {
         variables: { username },
      }
   );

   if (loadingFollowers) return null;
   const { getFollowers } = dataFollowers;

   return (
      <div className="followers">
         <p>
            <span>**</span> publicaciones
         </p>
         <p className="link">
            <span>{size(getFollowers)}</span> seguidores
         </p>
         <p className="link">
            <span>**</span> seguidos
         </p>
      </div>
   );
};

export default Followers;
