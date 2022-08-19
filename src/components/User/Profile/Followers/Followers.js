import React, { useEffect } from "react";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../../../gql/follow";
import "./Followers.scss";

const Followers = (props) => {
   const { username } = props;

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
