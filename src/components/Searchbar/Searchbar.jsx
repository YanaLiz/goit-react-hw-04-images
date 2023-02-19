import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchImgName: '',
  };
  static propTypes = {
    searchImgName: PropTypes.string,
    searchValueChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    onSearch: PropTypes.func,
  };

  searchValueChange = event => {
    this.setState({ searchImgName: event.currentTarget.value.toLowerCase() });
    
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchImgName.trim() === '') {
      return toast.error('Write search name');
    }
    this.props.onSearch(this.state.searchImgName);
    this.setState({ searchImgName: '' });
     
  };

  render() {
    const { searchImgName } = this.state;
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.searchValueChange}
            value={searchImgName}
            name="searchImgName"
          />
          <SearchFormButton type="submit">
            <ImSearch />
          </SearchFormButton>
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;


