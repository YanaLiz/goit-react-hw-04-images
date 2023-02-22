

import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainApp } from './App.styled';
import Loader from './Loader';
import fetchImages from './Api';



const App = () => {
  const [searchImgName, setSearchImgName] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const searchFormSubmit = imgSearch => {
    setSearchImgName(imgSearch);
    reset();
  };

  const reset = () => {
    setImages([]);
    setPage(1);
    setError('');
  };

  useEffect(() => {
    
    if (searchImgName === '') {
      return;
    }
    const controller = new AbortController();
    
    async function imgGallery() {
      
      try {
        setIsLoading(true);
        const response = await fetchImages(searchImgName, page, controller);
        if (response.length > 0) {
          return setImages(prevState => [...prevState, ...response]);
          
        } else {
          return toast.error(
            'Sorry, there are no images matching your search query.'
          );
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    imgGallery();

    return () => {
      controller.abort()
    };
  },[page, searchImgName])

  
  const loadMore = event => {
    event.preventDefault();
     setPage(page => page + 1);
  };


  return (
    <>
      <Searchbar onSearchProp={searchFormSubmit} />
      <MainApp>
        {isLoading && <Loader />}
        
        {error && <p>{error}</p>}
        {images.length !== 0 && (
          <ImageGallery images={images} onLoadMore={loadMore} />
        )}
        <ToastContainer autoClose={3000} />
      </MainApp>
    </>
  );
}



export default App;




