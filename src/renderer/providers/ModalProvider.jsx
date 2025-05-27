// ModalProvider.jsx
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalStack, setModalStack] = useState([]);

  const openModal = (content, { append = false } = {}) => {
    if (append) {
      setModalStack(prev => [...prev, content]);
    } else {
      setModalStack([content]);
    }
  };

  const closeModal = () => {
    setModalStack(prev => {
      const newStack = [...prev];
      newStack.pop(); // Remove the top modal
      return newStack;
    });
  };

  const isModalOpen = modalStack.length > 0;
  const modalContent = modalStack[modalStack.length - 1]; // Top of the stack

  return (
    <ModalContext.Provider value={{
      isModalOpen,
      modalContent,
      modalStack, 
      openModal,
      closeModal
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal debe ser usado dentro de un ModalProvider');
  }
  return context;
};
