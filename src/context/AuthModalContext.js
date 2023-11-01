import React, { createContext, useState } from "react";

export const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <AuthModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};
