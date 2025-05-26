import React, { useEffect } from 'react';
import { useModal } from '../providers/ModalProvider';
import { X } from 'lucide-react';

export default function Modal() {
  const { isModalOpen, modalStack, closeModal } = useModal();

  // 💡 Cierra el modal al presionar ESC
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, closeModal]);

  if (!isModalOpen || modalStack.length === 0) return null;

  return (
    <div className="fixed inset-0 max-h-screen overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center z-50">
      {modalStack.map((modalContent, index) => (
        <div
          key={index}
          className={`rounded-md shadow-lg max-w-lg w-full relative ${index !== modalStack.length - 1 ? 'hidden' : ''}`}
        >
          <X
            className="absolute cursor-pointer top-2 right-2 text-xl text-white hover:text-red-600"
            onClick={closeModal}
          />
          <div>{modalContent}</div>
        </div>
      ))}
    </div>
  );
}
