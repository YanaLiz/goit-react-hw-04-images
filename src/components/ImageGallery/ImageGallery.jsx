
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';
import LoadMore from 'components/LoadMore';
import Modal from 'components/Modal';
import Loader from 'components/Loader';

class ImageGallery extends Component {
  state = {
    showModal: false,
    modalImages: '',
    tags: '',
    isLoading: false,
  };
  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      isLoading: !prevState.isLoading,
    }));
  };
  openModalImages = id => {
    this.toggleModal();
    const image = this.props.images.find(img => img.id === id);
    this.setState({
      modalImages: image.largeImageURL,
      tags: image.tags,
    });
  };

  render() {
    const { images, onLoadMore } = this.props;
    const { isLoading, modalImages, tags, showModal } = this.state;

    return (
      <>
        {isLoading && <Loader />}
        <ImageGalleryList>
          {images.map(({ id, tags, webformatURL }) => (
            <ImageGalleryItem
              key={id}
              tags={tags}
              webformatURL={webformatURL}
              onClick={() => {
                this.openModalImages(id);
              }}
            />
          ))}
        </ImageGalleryList>
        {images.length > 11 && <LoadMore onClick={onLoadMore} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImages} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
export default ImageGallery;

