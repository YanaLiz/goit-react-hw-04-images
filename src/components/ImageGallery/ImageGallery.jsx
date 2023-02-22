import  { useState} from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types'

import LoadMore from 'components/LoadMore';
import Modal from 'components/Modal';
import Loader from 'components/Loader';

const ImageGallery = ({images, onLoadMore}) => {
 const [showModal, setShowModal] = useState(false);
  const [modalImages, setModalImages] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    
      setShowModal(prevState => !prevState)
      setIsLoading(prevState=> !prevState)
   
  };

  const openModalImages = (largeImageURL, tags)=> {
    toggleModal();
    setModalImages(largeImageURL)
    setTags(tags)
    
  };

    return (
      <>
        {isLoading && <Loader />}
        <ImageGalleryList>
          {images.map(({ largeImageURL, tags, webformatURL }) => (
            <ImageGalleryItem
              key={webformatURL}
              tags={tags}
              webformatURL={webformatURL}
              onClick={() => openModalImages(largeImageURL, tags)}
            />
          ))}
        </ImageGalleryList>
        {images.length > 11 && <LoadMore onClick={onLoadMore} />}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImages} alt={tags} />
          </Modal>
        )}
      </>
    );
  }

ImageGallery.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  modalImages: PropTypes.bool,
  toggleModal: PropTypes.func,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,

};

export default ImageGallery;

