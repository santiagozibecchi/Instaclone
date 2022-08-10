import React from 'react';
import { Grid, Image } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'; /* Para hacer el get de los usuarios */
import { GET_USER } from '../../gql/user';
import ImageNoFound from '../../assets/png/avatar.png';
import './Profile.scss';

const Profile = (props) => {


     const { username } = props;
     const { data, loading, error } = useQuery(GET_USER, {
          variables: { username }
     });
     // result -> Cuando se monta el componente por primera vez data => undefined 
     // porque todavia se esta resolviendo la peticion 

     if (loading) return null; /* con esto controlamos en renderizado del componente... Si esta cargado no hace nada */
     if (error) return <h1>Usuario no encontrado</h1>

     const { getUser } = data;
     console.log(getUser)


     return (
          <>
               <Grid className='profile'>
                    <Grid.Column width={5} className='profile__left'>
                         <Image
                              src={ImageNoFound}
                              avatar
                         />

                    </Grid.Column>

                    <Grid.Column width={11} className='profile__right'>
                         <div>Heafer Profile</div>
                         <div>Followers</div>
                         <div className='other'>
                              <p className='name'>{getUser.name}</p>
                              {getUser.siteWeb &&
                                   <a
                                        href={getUser.siteWeb}
                                        className='site-web'
                                        target="_blank"
                                   >
                                        {getUser.siteWeb}
                                   </a>
                              }
                              {getUser.description &&
                                   <p className='description'>{getUser.description}</p>
                              }
                         </div>
                    </Grid.Column>

               </Grid>


          </>
     )
}

export default Profile