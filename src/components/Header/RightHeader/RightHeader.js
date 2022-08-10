import React from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import ImageneNotFound from '../../../assets/png/avatar.png';
import './RightHeader.scss';

const RightHeader = () => {

     // para traer la informacion del usuario
     const { auth } = useAuth();



     return (
          <div className='right-header'>
               <Link to='/'>
                    <Icon name='home' />
               </Link>

               <Icon name='plus' />

               <Link to={`/${auth.username}`}>
                    <Image src={ImageneNotFound} avatar />
               </Link>
          </div>

     )
}

export default RightHeader