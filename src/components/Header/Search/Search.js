import React, { useEffect, useState } from 'react';
import { Search as SearchSU, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { size } from 'lodash'; /* para ver el tamanio de un array */
import { useQuery } from '@apollo/client';
import { SEARCH } from '../../../gql/user';
import ImageNoFound from '../../../assets/png/avatar.png';
import './Search.scss';

const Search = () => {

     // Estado para guardar lo que se esta escribiendo en el search
     const [search, setSearch] = useState(null);
     const [results, setResults] = useState([]);

     const { data, loading } = useQuery(SEARCH, {
          variables: { search }
     });

     console.log(results)

     useEffect(() => {

          // (?) porque puede que data sea nuloo y no quremos que devuelva un error
          if (size(data?.search) > 0) {

               const users = [];

               data.search.forEach((user, index) => {
                    users.push({
                         key: index,
                         title: user.name,
                         username: user.username,
                         avatar: user.avatar
                    });
               });

               setResults(users)

          } else {
               setResults([]);
          }

     }, [data])


     const onChange = (e) => {
          // Solo busca si e del input tiene valor
          if (e.target.value) {
               setSearch(e.target.value)
          } else {
               setSearch(null);
          }
     }

     // Funcion para limpiar el resultado
     const heandlerResultSelect = () => {
          setSearch(null);
          setResults([]);
     }

     return (
          <SearchSU
               className="search-users"
               fluid
               input={{ icon: 'search', iconPosition: 'left' }}
               loading={loading}
               value={search || ''} /* valor que esta escribiendo el usuario por pantalla, si search es null aplica el string vacio */
               onSearchChange={onChange}
               onResultSelect={heandlerResultSelect}
               results={results}
               resultRenderer={(e) => <ResultSearch data={e} />}
          />
     )
}

function ResultSearch(props) {
     const { data } = props;


     return (
          <Link className='search-users__item' to={`/${data.username}`}>
               <Image src={data.avatar || ImageNoFound} />
               <div>
                    <p>{data.title}</p>
                    <p>{data.username}</p>
               </div>
          </Link>
     )
}

export default Search