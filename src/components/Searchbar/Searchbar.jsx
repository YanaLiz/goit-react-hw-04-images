import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({onSearchProp}) => {
  const [searchImgName, setSearchImgName] = useState('');
  
 

  const handleSubmit = event => {
    event.preventDefault();
    if (searchImgName.trim() === '') {
      return toast.error('Write search name');
    }
    onSearchProp(searchImgName);
    setSearchImgName('');

  };

    return (
      <SearchbarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
              onChange={event =>
              setSearchImgName(event.currentTarget.value.toLowerCase())
            }
            value={searchImgName}
            name="searchImgName"
          />
          <SearchFormButton type="submit">
            <ImSearch />
          </SearchFormButton>
        </SearchForm>
      </SearchbarHeader>
    );
 
  };
Searchbar.propTypes = {
  onSearchProp: PropTypes.func.isRequired,
};
 
export default Searchbar;

