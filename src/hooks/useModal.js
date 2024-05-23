import { useState } from 'react';

export const useModal = (setPopoverOpen) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const openModal = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
      setPopoverOpen(false);
    };
  
    const closeModal = () => {
      setIsOpen(false);
      document.body.style.overflow = '';
      setPopoverOpen(false);
    };
  
    return [isOpen, openModal, closeModal];
  };