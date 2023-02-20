import React, { useEffect } from 'react';
import { OverlayWindow, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';


const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
       window.removeEventListener('keydown', handleKeyDown);
    }
  })

 

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

 
    return createPortal(
      <OverlayWindow onClick={handleBackdrop}>
        <ModalWindow>{children}</ModalWindow>
      </OverlayWindow>,
      modalRoot
    );
  }

export default Modal;


