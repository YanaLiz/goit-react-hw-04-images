import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

const ImageGalleryItem =({onClick, webformatURL, tags}) =>{
  
    return (
      <GalleryItem>
        <GalleryItemImg
          onClick={onClick}
          src={webformatURL}
          alt={tags}
          
        />
      </GalleryItem>
    );
  }
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;

