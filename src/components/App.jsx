

import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainApp } from './App.styled';
import Loader from './Loader';
import axios from 'axios';



class App extends Component {
  state = {
    images: [],
    error: '',
    page: 1,
    imgSearch: '',
    isLoading: false,
  };

  searchFormSubmit = imgSearch => {
    this.setState({
      imgSearch,
      images: [],
      page: 1,
      error: '',
    });
  };
  async componentDidUpdate(_, prevState) {
    if (
      prevState.imgSearch !== this.state.imgSearch ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const response = await axios({
          url: 'https://pixabay.com/api/',
          params: {
            key: '31272833-6208e6f151d79070e75270c69',
            q: this.state.imgSearch,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 12,
            page: this.state.page,
          },
        });

        if (response.totalHits === 0) {
          return toast.error('Sorry, didn`t find, try another');
        }

        if (response.data.hits.length) {
          return this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
          }));
        } else {
          return toast.error(
            'Sorry, there are no images matching your search query.'
          );
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  loadMore = event => {
    event.preventDefault();
    this.setState(pr => ({
      page: pr.page + 1,
    }));
  };



  render() {
    const { images, isLoading, error } = this.state;
    return (
      <>
        <Searchbar onSearch={this.searchFormSubmit} />
        <MainApp>
          {isLoading && <Loader />}
          {error && <p>{error}</p>}
          {images.length !== 0 && (
            <ImageGallery images={images} onLoadMore={this.loadMore} />
          )}
          <ToastContainer autoClose={3000} />
        </MainApp>
      </>
    );
  }
}
export default App;