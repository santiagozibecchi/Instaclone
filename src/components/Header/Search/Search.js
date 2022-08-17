import React, { useState } from 'react';
import { Search as SearchSU } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { SEARCH } from '../../../gql/user'
import './Search.scss';

const Search = () => {

     // Estado para guardar lo que se esta escribiendo en el search
     const [search, setSearch] = useState(null);

     const { data, loading } = useQuery(SEARCH, {
          variables: { search }
     });

     console.log(data);

     const onChange = (e) => {
          // Solo busca si e del input tiene valor
          if (e.target.value) {
               setSearch(e.target.value)
          } else {
               setSearch(null);
          }
     }

     return (
          <SearchSU
               className="search-users"
               fluid
               input={{ icon: 'search', iconPosition: 'left' }}
               onSearchChange={onChange}
          />

     )
}

export default Search