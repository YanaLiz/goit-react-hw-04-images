import { Component } from 'react';
import { OverlayWindow, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    tags: PropTypes.string,
    largeImageURL: PropTypes.string,
    handleBackdrop: PropTypes.func,
    handleKeyDown: PropTypes.func,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <OverlayWindow onClick={this.handleBackdrop}>
        <ModalWindow>
          {this.props.children}
        </ModalWindow>
      </OverlayWindow>,
      modalRoot
    );
  }
}

export default Modal;


